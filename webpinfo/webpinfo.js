import { app } from "/scripts/app.js";
app.registerExtension({
	name: "kaharos.webpsave",
setup(app,file){

async function getWebpExifData(webpFile) {
	const reader = new FileReader();
	reader.readAsArrayBuffer(webpFile);
  
	return new Promise((resolve, reject) => {
	  reader.onloadend = function() {
		const buffer = reader.result;
		const view = new DataView(buffer);
		let offset = 0;
  
		// Search for the "EXIF" tag
		while (offset < view.byteLength - 4) {
		  if (view.getUint32(offset, true) === 0x46495845 /* "EXIF" in big-endian */) {
			const exifOffset = offset + 6; 
			const exifData = buffer.slice(exifOffset);
			const exifString = new TextDecoder().decode(exifData).replaceAll(String.fromCharCode(0), ''); //Remove Null Terminators from string
			let exifJsonString = exifString.slice(exifString.indexOf("Workflow")); //find beginning of Workflow Exif Tag
			let promptregex="(?<!\{)}Prompt:{(?![\w\s]*[\}])"; //Regex to split }Prompt:{ // Hacky as fuck - theoretically if somebody has a text encode with dynamic prompts turned off, they could enter }Prompt:{ which breaks this
			let exifJsonStringMap = new Map([
			
			["workflow",exifJsonString.slice(9,exifJsonString.search(promptregex)+1)], // Remove "Workflow:" keyword in front of the JSON workflow data passed
			["prompt",exifJsonString.substring((exifJsonString.search(promptregex)+8))] //Find and remove "Prompt:" keyword in front of the JSON prompt data

			]);
			let fullJson=Object.fromEntries(exifJsonStringMap); //object to pass back
			
			resolve(fullJson);
			
		  }
  
		  offset++;
		}
  
		reject(new Error('EXIF metadata not found'));
}})};
	


const handleFile = app.handleFile;
app.handleFile = async function(file) { // Add the 'file' parameter to the function definition
	if (file.type === "image/webp") {
		
		const webpInfo =await getWebpExifData(file);
			if (webpInfo) {
				if (webpInfo.workflow) {
					this.loadGraphData(JSON.parse(webpInfo.workflow));
					}
			}
	} else {
		return handleFile.apply(this, arguments);
	}
}











},});
