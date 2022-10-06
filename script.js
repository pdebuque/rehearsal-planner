console.log('js ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('jquery ready');
    $('#generalButton').on('click', setUpRehearsal);
    $('#sectionButton').on('click', addSection)
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

        sectionStart = $('#rehearsalStart').val();

        //clear inputs
        $('#ensembleName').val('');
        $('#rehearsalNumber').val('');
        $('#rehearsalDate').val(null);
        $('#rehearsalStart').val(null);
        $('#rehearsalEnd').val(null);
    }
}

function addSection() {
    console.log('in addSection');

    $('#rehearsalSections').html(
        `<div class='rehearsalSection'>`
    )


    //update section start
    sectionStart += $('#sectionLength').val()

    // clear inputs
}