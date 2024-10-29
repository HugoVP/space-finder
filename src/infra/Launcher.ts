import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";

const app = new App();
const { spacesTable } = new DataStack(app, "DataStack");
const { spacesLambdaIntegration } = new LambdaStack(app, "LambdaStack", { spacesTable });
new ApiStack(app, "ApiStack", { spacesLambdaIntegration });