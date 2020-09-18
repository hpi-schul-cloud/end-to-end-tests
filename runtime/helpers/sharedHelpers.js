//This file should NOT contain any module.exports !!!

//May be required but should not require

async function getElement(selectorOrElement) {
	if (typeof selectorOrElement === "string") {
		return driver.$(selectorOrElement);
	}
	return selectorOrElement;
};

module.exports = {
    getElement,
};