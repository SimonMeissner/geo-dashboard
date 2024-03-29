import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import PrimaryButton from "../Button/PrimaryButton";
import { useEffect, useRef } from "react";

interface Props {
	showModal: boolean;
	setShowModal: (bool: boolean) => void;
}

export default function DatasetInformationModal(props: Props) {
	const modalRef = useRef(null);

	const dataset = useSelectedDatasetStore((state) => state.dataset);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				props.setShowModal(false);
			}
		};

		if (props.showModal) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [props.showModal, props.setShowModal]);

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 ${
				props.showModal ? "" : "hidden"
			}`}
		>
			<div className="fixed inset-0 bg-gray-900 opacity-50 z-45"></div>
			<div
				ref={modalRef}
				className="bg-white rounded-lg w-1/2 relative z-50"
			>
				<div className="px-6 py-4">
					<div className="text-lg font-medium text-gray-900">
						Information about the Dataset
					</div>
					<div className="flex items-baseline gap-1 mt-4 text-sm text-gray-600">
						{dataset == "roadnetworkdensity" && (
							<>
								<h1 className="text-lg">
									Road network density per area |
								</h1>
								<small className="self-end pb-1">
									measured in: km/km²
								</small>
							</>
						)}
						{dataset == "greenlandpercentage" && (
							<>
								<h1 className="text-lg">
									Share of grassland in total area
								</h1>
								<small className="self-end pb-1">
									measured in: %
								</small>
							</>
						)}
						{dataset == "woodlandpercentage" && (
							<>
								<h1 className="text-lg">
									Share of woodland in total area
								</h1>
								<small className="self-end pb-1">
									measured in: %
								</small>
							</>
						)}
						{dataset == "agriculturallandpercentage" && (
							<>
								<h1 className="text-lg">
									Share of agricultural land in total area
								</h1>
								<small className="self-end pb-1">
									measured in: %
								</small>
							</>
						)}
					</div>
				</div>
				<div className="px-6 py-4 bg-gray-100 text-right rounded-b-lg">
					<PrimaryButton
						onClick={() => props.setShowModal(false)}
						uppercase
					>
						Close
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
}
