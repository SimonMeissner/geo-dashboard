import { states } from "../data/states";
import React, { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { Feature } from "@/types/types";
import TableView from "./TableView";
import YearControl from "./YearControl";
import GraphView from "./GraphView";
import MapFeature from "./MapFeature";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import DetailModal from "./Modal/DetailModal";
import DatasetModal from "./Modal/DatasetModal";
import CompareFeaturesControl from "./CompareFeaturesControl";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";

interface Props {
	bounds: number[][];
	center: number[];
	filtering: boolean;
	differenceOnly: boolean;
	filteringAndDifference: boolean;
}

const POSITION_CLASSES = {
	bottomleft: "leaflet-bottom leaflet-left",
	bottomright: "leaflet-bottom leaflet-right",
	topleft: "leaflet-top leaflet-left",
	topright: "leaflet-top leaflet-right",
};

export default function Map(props: Props) {
	const selectedFeature = useSelectedFeatureStore((state) => state.feature);

	const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
	const [showDatasetModal, setShowDatasetModal] = useState<boolean>(false);

	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);

	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);

	return (
		<>
			{showDatasetModal ? (
				<DatasetModal
					showModal={showDatasetModal}
					setShowModal={setShowDatasetModal}
				/>
			) : null}
			{showDetailModal ? (
				<DetailModal
					feature={selectedFeature}
					showModal={showDetailModal}
					setShowModal={setShowDetailModal}
				/>
			) : null}
			<MapContainer
				center={props.center}
				zoom={6}
				style={{ height: "calc(100vh - 65px)", zIndex: 40 }}
				keyboard
				minZoom={6}
				maxBounds={props.bounds}
				zoomControl={false}
			>
				<ZoomControl position="bottomright" />
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{states.features.map((state: Feature, index: number) => (
					<MapFeature
						key={index}
						feature={state}
						setShowModal={setShowDetailModal}
					/>
				))}

				<div
					className={`${POSITION_CLASSES.topleft} h-full w-screen pb-8 flex`}
				>
					<div className="w-1/3">
						<div className={`h-1/2`}>
							{props.differenceOnly &&
							comparisonFeature1 &&
							comparisonFeature2 ? (
								<GraphView
									features={[
										comparisonFeature1,
										comparisonFeature2,
									]}
								/>
							) : (
								<GraphView features={states.features} />
							)}
						</div>

						<div className="h-1/2">
							<TableView features={states.features} />
						</div>
					</div>
					<div className="mx-3 w-1/3 h-fit flex">
						{/* <DatasetInformationButton
							setShowDatasetModal={setShowDatasetModal}
						/> */}
						<YearControl />
						<CompareFeaturesControl />
					</div>
					<div className="mx-10 w-1/3"></div>
				</div>
				{props.filteringAndDifference &&
				comparisonFeature1 &&
				comparisonFeature2 ? (
					<div
						className={`${POSITION_CLASSES.topright} h-full w-screen pb-8 flex`}
					>
						<div className="w-2/3"></div>
						<div className="w-1/3">
							<div className={`h-1/2`}>
								<GraphView
									features={[
										comparisonFeature1,
										comparisonFeature2,
									]}
								/>
							</div>

							<div className="h-1/2">
								<TableView
									features={[
										comparisonFeature1,
										comparisonFeature2,
									]}
								/>
							</div>
						</div>
					</div>
				) : null}
			</MapContainer>
		</>
	);
}
