// This is a closure function https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36
(function() {

  let inp_f = document.getElementsByTagName("input");
  let nfield = inp_f.item('name');
  let phno = inp_f[1];
  let email = inp_f[2];

  let selection = document.getElementsByTagName("select");
  let dep1 = selection[0];
  let dep2 = selection[1];

  var initialize = function() {
    /*
      1. Add all your event bindings here. Please avoid binding events inline and add your event listeners here.

      onSubmit callback
      disableDuplicateSecondaryDepartment callback,...
    */

    var regf = document.forms.item(0); 
    regf.addEventListener('submit', onSubmit);

    dep1.addEventListener('change', disableDuplicateSecondaryDepartment);
    
  };

  var disableDuplicateSecondaryDepartment = function() {
    // 2. in department2, Should disable the option selected in department1

    for(let i=0;i<dep2.length;i+=1)
    {
      if(dep2[i].value===dep1.value)
        {
          dep2[i].disabled=true;
        }
      else
        {
          dep2[i].disabled=false;
        }
    }
    
  }

  var constructData = function() {
    var data = {};

    // 3. Construct data from the form here. Please ensure that the keys are the names of input elements

    data[nfield.name]=nfield.value;
    data[phno.name]=phno.value;
    data[email.name]=email.value;
    data[dep1.name]=dep1.value;
    data[dep2.name]=dep2.value;

    return data;
  }

  var validateResults = function(data) {
    var valid = true;

    // 4. Check if the data passes all the validations here
    var special = /[ !#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

    if(data[nfield.name].length>100){
      valid=false;
    } else if(data[phno.name].length>10){
      valid=false;
    } else if(!data[email.name].endsWith("@college.edu")){
      valid=false;
    } else if(special.test(data[email.name])){
      valid=false;
    } else if(dep1.value===dep2.value){
	    valid=false;	
	  }

    return valid;
  };

  var onSubmit = function(event) {
    // 5. Figure out how to avoid the redirection on form submit

    var data = constructData();

    if (validateResults(data)) {
      event.preventDefault();
      printResults(data);
    } else {
      var resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = '';
      event.preventDefault();
      resultsDiv.classList.add("hide");
    }
  };

  var printResults = function(data) {
    var constructElement = function([key, value]) {
      return `<p class='result-item'>${key}: ${value}</p>`;
    };

    var resultHtml = (Object.entries(data) || []).reduce(function(innerHtml, keyValuePair) {
      debugger
      return innerHtml + constructElement(keyValuePair);
    }, '');
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = resultHtml;
    resultsDiv.classList.remove("hide");
  };

  /*
    Initialize the javascript functions only after the html DOM content has loaded.
    This is to ensure that the elements are present in the DOM before binding any event listeners to them.
  */
  document.addEventListener('DOMContentLoaded', initialize);
})();