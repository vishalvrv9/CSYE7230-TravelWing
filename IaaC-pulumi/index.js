const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");

// Get the default VPC
const defaultVpc = aws.ec2.getVpc({ default: true });

// Get subnet IDs from the default VPC
const subnets = defaultVpc.then(vpc => aws.ec2.getSubnets({ vpcId: vpc.id }))
                          .then(subnetResponse => subnetResponse.ids);

// Create a security group
const secGroup = new aws.ec2.SecurityGroup("example-secgroup", {
    vpcId: defaultVpc.then(vpc => vpc.id),
    description: "Allow SSH",
    ingress: [{
        protocol: "tcp",
        fromPort: 22,
        toPort: 22,
        cidrBlocks: ["0.0.0.0/0"],
    },
    {
        protocol: "tcp",
        fromPort: 3000,
        toPort: 3000,
        cidrBlocks: ["0.0.0.0/0"],
    },
    {
        protocol: "tcp",
        fromPort: 8080,
        toPort: 8080,
        cidrBlocks: ["0.0.0.0/0"], // Adjust this as necessary for security
    }
],
    egress: [{
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"],
    }]

});

// Specify AMI ID
const amiId = "ami-0c9417c2fcac08891"; 

// Create an EC2 instance
const instance = new aws.ec2.Instance("ec2", {
    instanceType: "t2.medium",
    vpcSecurityGroupIds: [secGroup.id],  
    ami: amiId,
    subnetId: subnets.then(s => s[0]), 
    keyName: "ec2keypair"
});
const domain = "travelwing.online"

const hostedZone = aws.route53.getZone({
    name:domain,
  });


const aRecord = hostedZone.then(zone => {
    return new aws.route53.Record('travelwingA', {
        name: domain,
        zoneId: zone.id,
        type: 'A',
        ttl: 300,
        records: [instance.publicIp]
    });
});
exports.instanceId = instance.id;
exports.publicIp = instance.publicIp;
exports.securityGroupId = secGroup.id;
exports.hostedZoneId = hostedZone.then(zone => zone.id);
exports.aRecordName = aRecord.then(record => record.name);