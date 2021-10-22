function createPreview(data) {
	let mainDiv = document.querySelector(".previews");
	let defaultDiv = document.querySelector(".preview-card-default");
  
	if (data.length !== 0) {
	  for (let i = 0; i < data.length; i++) {
		let clone = defaultDiv.cloneNode(true);
		let counter = 0;
  
		clone.setAttribute("class", `preview-card-${i}`);
		clone.setAttribute("id", `preview-card-${i}`);
  
		let featureElements = clone.querySelector(".content");
		featureElements.childNodes.forEach((element) => {
		  if (element.nodeName === "P") {
			element.className = `.features-${i}`;
			element.textContent += Object.values(data[i])[counter];
			counter++;
		  }
		});
		counter = 0;
  
		clone.style.display = "block";
		mainDiv.appendChild(clone);
	  }
	} else {
	  let noResults = document.getElementById("noResults");
	  noResults.style.display = "block";
	  let noResultsIMG = document.getElementById("noResultsIMG");
	  noResultsIMG.style.display = "block";
	}
	mainDiv.removeChild(defaultDiv);
  }
  
function filterData(data) {
	let windowLocation = location.href;
	let query = windowLocation
	  .split("search.html?query=")
	  .slice(-1)[0]
	  .toUpperCase();
	query = query.replaceAll("%20", " ");
	let tempValues = [];
	let numQueryMatched = 0;
	let queries = query.split(",");
	queries.forEach(el => {
		if (el[0] === " "){
			queries[queries.indexOf(el)] = el.replace(" ", "");
		}
	});
	let isMatched = false;
  
	let matchedIndexes = new Set();
	let matchedData = [];
	let tempData = {};

	for (let i = 0;i < 11914;i++){
		for (let field in data) {
			tempValues.push(data[field][i]);
		}
		for (let j = 0; j < queries.length; j++) {
			for (let k = 0; k < tempValues.length; k++){
				el = tempValues[k]
				if (typeof el === "string") {
					el = el.toUpperCase();
				} else {
					el = JSON.stringify(el);
				}

				if (el.includes(queries[j])){
					numQueryMatched++;
					isMatched = true;
					break;
				}
			}
			if (isMatched){
				isMatched = false;
				continue;
			}			
		}
		if (numQueryMatched === queries.length){
			matchedIndexes.add(i);
		}
		tempValues = [];
		numQueryMatched = 0;
	}
	matchedIndexes = Array.from(matchedIndexes);
	matchedIndexes.forEach((matchedIndex) => {
	  for (let field in data) {
		tempData[field] = data[field][matchedIndex];
	  }
	  matchedData.push(tempData);
	  tempData = {};
	});

	return matchedData;
  }
  
async function getData() {
	let url = "./data/data.json";
	let response = await fetch(url);
  
	let data = await response.json();
  
	createPreview(filterData(data));
}
  
getData();