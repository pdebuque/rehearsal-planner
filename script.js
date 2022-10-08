console.log('js ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('jquery ready');
    $('#generalButton').on('click', setUpRehearsal);
    $('#sectionButton').on('click', addSection)
}

//function to make working with time data easier. format hh:mm --> minutes
//time is given as a string
const sampleTime = "02:45";
const sampleMinutes = 400;

function timeToMinutes(time) {

    const hours = Number(time[0] + time[1]);
    const minutes = Number(time[3] + time[4]);
    const convertedTime = hours * 60 + minutes;

    return convertedTime
}

//change minutes back to the string time format.
//this seems way mesier than it needs to be. dealing with time may need some refactoring/cleaning up later.

function minutesToTime(minutes) {

    let hours = String(Math.floor(minutes / 60));
    if (hours.length < 2) {
        hours = "0" + hours;
    }
    const convertedMinutes = minutes % 60;
    while (convertedMinutes.length < 2) {
        convertedMinutes = "0" + convertedMinutes;
    }
    const convertedTime = hours + ':' + convertedMinutes;

    return convertedTime
}


let sectionStart = 0;

function setUpRehearsal() {
    //this should only work if there is not already a general info section
    if (!$('#rehearsalHeader').html()) {

        //take inputs above and deliver them as a header underneath the questionaire
        console.log('in setUpRehearsal')

        $('#rehearsalHeader').html(
            `<div class="generalInfo">
        <h3>${$('#ensembleName').val()}
        <h4>Rehearsal ${$('#rehearsalNumber').val()}</h4>
        <div> ${$('#rehearsalDate').val()} </div>
        <div> ${$('#rehearsalStart').val()}-${$('#rehearsalEnd').val()} </div>
    </div>`);

        //update section start time for use in section addition

        sectionStart = timeToMinutes($('#rehearsalStart').val());

        //clear inputs
        $('#ensembleName').val('');
        $('#rehearsalNumber').val('');
        $('#rehearsalDate').val(null);
        $('#rehearsalStart').val(null);
        $('#rehearsalEnd').val(null);
    }
}

const rhslSectionsArray = [];

function addSection() {
    console.log('in addSection');

    const endTimeMinutes = sectionStart + Number($('#sectionLengthMinute').val());
    //create section object

    const rhslSection = {
        name: $('#sectionName').val(),
        duration: $('#sectionLengthMinute').val(),
        startTimeString: minutesToTime(sectionStart),
        startTimeMinutes: sectionStart,
        endTimeString: minutesToTime(endTimeMinutes),
        endTimeMinutes: endTimeMinutes,
        sectionInfo: $('sectionInfo').val()
    }

    console.log(rhslSection);
    // add to array of all sections
    rhslSectionsArray.push(rhslSection);
    console.log(rhslSectionsArray);

    // create html
    $('#rehearsalSections').append(
        `<div id='${rhslSection.sectionName}' class='rehearsalSection ui-widget-content'>
            <p>
                <span class='sectionSpan'>${rhslSection.startTimeString}-${rhslSection.endTimeString}</span> <span class='sectionDuration'>(${rhslSection.duration}m)</span>: ${$('#sectionName').val()}
            </p>
            <p>
                ${rhslSection.sectionInfo}
            </p>


        </div>`
    )
    //make the new section draggable
    $(function () {
        $('.rehearsalSection').draggable({
            containment: 'parent',
            snap: true,
            cursor: 'move',
            stack: '#rehearsalSections'
        })
    })
    //update section start
    sectionStart += rhslSection.duration;

    // clear inputs
    $('#sectionName').val('');
    $('#sectionLengthHour').val(null);
    $('#sectionLengthMinute').val(null);
    $('#sectionInfo').val('');

}

