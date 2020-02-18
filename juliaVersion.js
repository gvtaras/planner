$(document).ready(function() {
                console.log( "document loaded" );
                $( "#save" ).click( function() {
                    var filename = "plan.json";
                    download2(filename, jsonData);
                });

                $( "#import" ).click(importJson);
            });

              var files = document.getElementById('selectFiles').files;
                console.log(files);
                if (files.length <= 0) {
                    return false;
                }

                var fr = new FileReader();

                fr.onload = function(e) {
                    console.log(e);
                    /* console.log(e.target.result) */;
                    var result = JSON.parse(e.target.result);
                    var formatted = JSON.stringify(result, null, 2);
                    jsonData = formatted;
                    document.getElementById('result').value = formatted;
                    makeList2(result);
                };

                fr.readAsTfunction importJson() {
              ext(files.item(0));

            }

            function download2(filename, textToSave) {
                var blob = new Blob([textToSave], {type: "text/plain;charset=utf-8"});

                saveAs(blob, filename);
            }

            function makeList2(listData) {
                // Establish the array which acts as a data source for the list
                var currentdate = new Date(), 
                    first = currentdate.getDate() - currentdate.getDay() + 1, // First day is the day of the month - the day of the week
                    first2week = first + 7, // last day is the first day + 6
                    first3week = first2week + 7, // last day is the first day + 6
                    first2week = first3week + 7; // last day is the first day + 6

                var week1firstday = new Date(currentdate.setDate(first)).toUTCString(),
                    week2firstday = new Date(currentdate.setDate(first2week)).toUTCString(),
                    week3firstday = new Date(currentdate.setDate(first3week)).toUTCString(),
                    week4firstday = new Date(currentdate.setDate(first4week)).toUTCString();
                var wrapper = '<div><h1>Project Roadmap</h1><table id="project-timeline"><th class="table-heading"><td class="week1"><h4>Week Starting ' + week1firstday + '</h4></td><td class="week2"><h4>Week Starting ' + week2firstday + '</h4></td><td class="week3"><h4>Week Starting ' + week3firstday + '</h4></td><td class="week4"><h4>Week Starting ' + week4firstday + '</h4></td></th></table></div>',

                $(body).append(wrapper);

                listData.forEach(function(i,el){
                    var rowTemplateWrapper = '<tr class="task'+ i +'"></tr>';
                    $("#project-timeline").append(rowTemplate);
                })

                let listContainer = document.createElement('div'),
                    // Make the list
                    listElement = document.createElement('ul'),
                    // Set up a loop that goes through the items in listItems one at a time
                    numberOfListItems = listData.elements.length,
                    listItem,
                    i;

                // Add it to the page
                document.getElementsByTagName('body')[0].appendChild(listContainer);
                listContainer.appendChild(listElement);

                for (i = 0; i < numberOfListItems; ++i) {
                    // create an item for each one
                    let element = listData.elements[i];

                    listItem = document.createElement('li');

                    let header = createTaskHeader(element);
                    let details = createTaskDetails(element);

                    listItem.appendChild(header);
                    listItem.appendChild(details);

                    header.onclick = function() {
                        $( details ).slideToggle("fast");
                    };

                    // Add listItem to the listElement
                    listElement.appendChild(listItem);
                }
            }

            function createTaskHeader(element) {

                let header = document.createElement('div');
                header.className = 'task-header';
                header.id = element.id;
                header.innerHTML = element.name;

                return header;
            }

            function createTaskDetails(element) {

                let details = document.createElement('panel');
                details.className = 'task-details';
                details.id = 'details-' + element.id;
                details.innerHTML = element.AC;

                return details;
            }
