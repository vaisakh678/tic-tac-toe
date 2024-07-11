import React from "react";

const Cross: React.FC = () => {
	return (
		<div className="flex flex-col h-full items-center justify-center relative">
			<div className="w-full h-1 absolute rotate-45 rounded-sm bg-black" />
			<div className="w-full h-1 absolute -rotate-45 rounded-sm bg-black" />
		</div>
	);
};

export default Cross;

