const aws = require("@pulumi/aws");

async function getLatestAmi() {
    const ami = await aws.ec2.getAmi({
        owners: ["amazon"],
        filters: [
            { name: "name", values: ["amzn2-ami-hvm-*-x86_64-ebs"] },
            { name: "state", values: ["available"] },
        ],
        mostRecent: true,
    });
    return ami.id;
}

const defaultVpc = aws.ec2.getVpc({ default: true });


const defaultSubnet = defaultVpc.then(vpc => 
    aws.ec2.getSubnet({
        defaultForAz: true,
        vpcId: vpc.id,
    })
);

const server = new aws.ec2.Instance("web-server", {
    ami: getLatestAmi(),
    instanceType: "t2.micro",
    subnetId: defaultSubnet.then(subnet => subnet.id),
    tags: {
        Name: "Pulumi-EC2",
    },
});

exports.instanceId = server.id;
exports.publicIp = server.publicIp;
