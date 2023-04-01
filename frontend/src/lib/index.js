const dev = "http://localhost:4000";
const prod = "http://ec2-13-50-248-185.eu-north-1.compute.amazonaws.com:4000";


// export const baseURL = dev;

export const baseURL =
  window.location.hostname.split(":")[0] === "localhost" ||
  window.location.hostname.includes("192")
    ? dev
    : prod;