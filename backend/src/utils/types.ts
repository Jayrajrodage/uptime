export enum ChannelEnum {
  Email = "Email",
  SMS = "SMS",
  Discord = "Discord",
  slack = "slack",
}

export const REGION_TO_LAMBDA_NAME: Record<string, string> = {
  "ap-south-1": "pingFromIndia",
  "us-west-1": "pingFromUSA",
  "eu-west-2": "pingFromUK",
  "sa-east-1": "pingFromBrazil",
  "af-south-1": "pingFromSouthAfrica",
  "ap-southeast-2": "pingFromAustralia",
};

const subRegionToRegion = {
  India: "Asia",
  USA: "NorthAmerica",
  UK: "Europe",
  Brazil: "SouthAmerica",
  SouthAfrica: "Africa",
  Australia: "Oceania",
};

export const RegionToAwsRegion: Record<string, string> = {
  India: "ap-south-1",
  USA: "us-west-1",
  UK: "eu-west-2",
  Brazil: "sa-east-1",
  SouthAfrica: "af-south-1",
  Australia: "ap-southeast-2",
};
