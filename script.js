console.log('js ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('jquery ready');
    $('#generalButton').on('click', setUpRehearsal);
    $('#sectionButton').on('click', addSection)
}

function setUpRehearsal() {
    //take inputs above and deliver them as a header underneath the questionaire
    console.log('in setUpRehearsal')

    $('body').append(
        `<div class="generalInfo"><h3>Rehearsal Number ${$('#rehearsalNumber').val()}</h3>
        <div> ${$('#rehearsalDate').val()} </div>
        <div> ${$('#rehearsalStart').val()}-${$('#rehearsalEnd').val()} </div>
    </div>`)
}

function addSection() {
    console.log('in addSection')
}