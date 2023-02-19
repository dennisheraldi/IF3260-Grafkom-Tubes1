//  save objects
function saveButtonHandler() {
  let file = new Blob([JSON.stringify(object)], { type: "text/plain;charset-utf-8" });
  let currentdate = new Date(); 
  let filename = "saved_data_" + currentdate.getDate() + "-"
              + (currentdate.getMonth() + 1)  + "-" 
              + currentdate.getFullYear() + "-"  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes() + ":" 
              + currentdate.getSeconds() + ".txt";
  
  console.log(filename)
  if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
      let a = document.createElement("a"),
              url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
  }
}

function loadButtonHandler() {
  let input = document.getElementById('load-file')
  let files = input.files;

  if (files.length == 0) {
      alert("Please select a file.");
      return;
  }

  const file = files[0]

  let reader = new FileReader();
  reader.onload = (e) => {
    let contents = e.target.result;
    object = JSON.parse(contents);
  }
  reader.onerror = (e) => alert(e.target.error.name)
  reader.readAsText(file);
}