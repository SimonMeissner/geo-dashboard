import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		if (request.method === "POST") {
			const { activity, connection_id } = request.body;

			const client = await clientPromise;
			const db = client.db("geo-dashboard");

			const activites = db.collection("activities");


			const result = await activites.insertOne({
				timestamp: new Date(),
				activity: activity,
				connection_id: connection_id,
			});

			response
				.status(200)
				.json({ message: "Activity logged successfully" });
		} else {
			response.status(405).json({ message: "Method not allowed" });
		}
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
}
