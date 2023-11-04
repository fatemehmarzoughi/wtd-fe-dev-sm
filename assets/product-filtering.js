/* -------------------------------------------------------------------------- */
/*                          Filter Products Form                              */
/* -------------------------------------------------------------------------- */

class FilterCollectionsForm extends HTMLElement {
  constructor() {
    super();
    this.querySelector("#filters-form").addEventListener(
      "input",
      this.filterCategorySelected.bind(this)
    );
    document.getElementById("on-submit").addEventListener('click', FilterCollectionsForm.onSubmit);
  }

  filterCategorySelected(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    FilterCollectionsForm.generateFilterData(inputName, inputValue);
  }

  /* -------------------- Store applyed filters in an array ------------------- */
  static generateFilterData(inputName, inputValue) {
    if (FilterCollectionsForm.filterData.includes(inputName)) {
      const index = FilterCollectionsForm.filterData.indexOf(inputName);
      FilterCollectionsForm.filterData[index + 1] = inputValue;
    } else {
      FilterCollectionsForm.filterData = [
        ...FilterCollectionsForm.filterData,
        inputName,
        inputValue,
      ];
    }
  }

  /* ----------------- transfer the stored array into a string ---------------- */
  static generateSearchParams() {
    FilterCollectionsForm.filterData.map((f, index) => {
      if (index % 2 == 0)
        FilterCollectionsForm.searchParam =
          FilterCollectionsForm.searchParam +
            FilterCollectionsForm.searchParam.length >=
          1
            ? "&"
            : "" + f + "=" + FilterCollectionsForm.filterData[index + 1];
    });
  }

  /* -------------------------- Handle Submit button -------------------------- */
  static onSubmit() {
    FilterCollectionsForm.generateSearchParams();
    history.pushState(null, "", `?${FilterCollectionsForm.searchParam}`)
  }
}

FilterCollectionsForm.filterData = [];
FilterCollectionsForm.searchParam = "";

customElements.define("filter-collection-form", FilterCollectionsForm);
