import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";
import { useSelectedFeatureStore } from "@/store/selectedFeatureStore";
import { toast } from "react-toastify";

export default function ComparisonControl() {
	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);
	const setComparisonFeature1 = useCompareFeaturesStore(
		(state) => state.setFeature1
	);
	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);
	const setComparisonFeature2 = useCompareFeaturesStore(
		(state) => state.setFeature2
	);
	const comparisonFeature3 = useCompareFeaturesStore(
		(state) => state.feature3
	);
	const setComparisonFeature3 = useCompareFeaturesStore(
		(state) => state.setFeature3
	);
	const compareFeatureState = useCompareFeaturesStore(
		(state) => state.compareFeatureState
	);
	const setCompareFeatureState = useCompareFeaturesStore(
		(state) => state.setCompareFeatureState
	);
	const setSelectedFeature = useSelectedFeatureStore(
		(state) => state.setFeature
	);

	const handleStartSelectionProcess = () => {
		setSelectedFeature(undefined);
		setCompareFeatureState("Selection");
	};

	const handleStartComparisonProcess = () => {
		if (minimumTwoOfThreeSelectedForComparison()) {
			setCompareFeatureState("Comparison");
		} else {
			toast("Please select a minimum of two features!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
				type: 'error'
			});
		}
	};

	const minimumTwoOfThreeSelectedForComparison = (): boolean => {
		if (
			comparisonFeature1 != undefined &&
			comparisonFeature2 != undefined
		) {
			return true;
		} else if (
			comparisonFeature2 != undefined &&
			comparisonFeature3 != undefined
		) {
			return true;
		} else if (
			comparisonFeature1 != undefined &&
			comparisonFeature3 != undefined
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleStopComparisonProcess = () => {
		setComparisonFeature1(undefined);
		setComparisonFeature2(undefined);
		setComparisonFeature3(undefined);
		setCompareFeatureState("Off");
	};

	return (
		<>
			<div className="leaflet-control bg-white rounded-lg w-52">
				{compareFeatureState == "Off" ? (
					<div
						className="flex items-center justify-center cursor-pointer text-md font-semibold w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600"
						onClick={handleStartSelectionProcess}
					>
						Comparison
					</div>
				) : null}
				{compareFeatureState == "Selection" ? (
					<div
						className="flex items-center justify-center cursor-pointer text-md font-semibold w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600"
						onClick={handleStartComparisonProcess}
					>
						Start Comparison Process
					</div>
				) : null}
				{compareFeatureState == "Comparison" ? (
					<div
						className="flex items-center justify-center cursor-pointer text-md font-semibold w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600"
						onClick={handleStopComparisonProcess}
					>
						Stop Comparison Process
					</div>
				) : null}
				{compareFeatureState == "Selection" ? (
					<div className="absolute mt-1 p-2 w-52 rounded-md bg-white text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm flex flex-wrap gap-1">
						{comparisonFeature1 == undefined &&
						comparisonFeature2 == undefined ? (
							<p>
								Please select features by clicking on them on
								the map
							</p>
						) : null}
						{comparisonFeature1 != undefined ? (
							<p className="bg-indigo-300 px-2 py-1 rounded-xl text-indigo-800 w-fit">
								{comparisonFeature1.properties.NUTS_NAME}
							</p>
						) : null}
						{comparisonFeature2 != undefined ? (
							<p className="bg-indigo-300 px-2 py-1 rounded-xl text-indigo-800 w-fit">
								{comparisonFeature2.properties.NUTS_NAME}
							</p>
						) : null}
						{comparisonFeature3 != undefined ? (
							<p className="bg-indigo-300 px-2 py-1 rounded-xl text-indigo-800 w-fit">
								{comparisonFeature3.properties.NUTS_NAME}
							</p>
						) : null}
					</div>
				) : null}
			</div>
		</>
	);
}
