import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpaces";
import { deleteSpaces } from "./DeleteSpaces";
import { JSONError, MissingFieldError } from "../shared/Validator";

const ddbClient = new DynamoDBClient({});

async function handleGetResponse(event: APIGatewayProxyEvent, context: Context, ddbClient: DynamoDBClient) {
    const getResponse = await getSpaces(event, context, ddbClient);
    console.log(getResponse);
    return getResponse;
}

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    try {
        switch (event.httpMethod) {
            case "GET":
                return await handleGetResponse(event, context, ddbClient);

            case "POST":
                const postResponse = await postSpaces(event, context, ddbClient);
                console.log(postResponse);
                return postResponse;

            case "PUT":
                const putResponse = await updateSpaces(event, context, ddbClient);
                console.log(putResponse);
                return putResponse;

            case "DELETE":
                const deleteResponse = await deleteSpaces(event, context, ddbClient);
                console.log(deleteResponse);
                return deleteResponse;

            default:
                return await handleGetResponse(event, context, ddbClient);
        }
    } catch (err) {

        if (err instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: JSON.stringify(err.message),
            };
        }

        if (err instanceof JSONError) {
            return {
                statusCode: 400,
                body: JSON.stringify(err.message),
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify(err.message),
        };
    }

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    };

    return response;
}

export { handler }
