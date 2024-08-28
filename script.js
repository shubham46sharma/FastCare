// Predefined appointment data (this can be fetched from a server in real applications)
const appointmentData = [
    ['8:30 - 9:00', '8:30 - 9:00', '8:30 - 9:00', '8:30 - 9:00', '8:30 - 9:00'],
    ['9:30 - 10:00', '9:30 - 10:00', '10:30 - 11:00', '2:30 - 3:00', '2:30 - 4:00'],
    ['10:30 - 11:00', '10:30 - 11:00', '4:30 - 5:00', '2:30 - 3:00', '4:00 - 5:00']
];

// Function to populate the appointment table
function populateAppointmentTable() {
    const tbody = document.querySelector('#appointmentTable tbody');
    tbody.innerHTML = '';  // Clear existing content

    appointmentData.forEach((rowData, rowIndex) => {
        const row = document.createElement('tr');
        rowData.forEach((cellData, colIndex) => {
            const cell = document.createElement('td');
            const link = document.createElement('a');
            link.href = "#";  // Change this to the actual URL or functionality
            link.textContent = cellData;
            link.classList.add('appointment-slot');
            link.addEventListener('click', function (event) {
                event.preventDefault();
                alert(`Clicked on ${cellData} on ${['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'][colIndex]}`);
            });
            cell.appendChild(link);
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

// Function to handle the skip button click
function handleSkipButtonClick() {
    // Hide appointment slots and show reason textarea
    document.getElementById('appointmentSection').innerHTML = `
        <h4>Please Type Reason For Skip:</h4>
        <textarea class="form-control" rows="5"></textarea>
    `;

    // Replace patient section content with a dropdown
    document.getElementById('patientSection').innerHTML = `
        <h4>Action Taken</h4>
        <select class="form-control">
            <option selected disabled>Select Action</option>
            <option>Left a message</option>
            <option>Closed Patient</option>
        </select>

    `;

    // Change the text and style of the skip button to "Cancel"
    const skipButton = document.getElementById('skipButton');
    skipButton.textContent = "Cancel";
    skipButton.classList.remove('btn-warning');
    skipButton.classList.add('btn-danger');
    skipButton.id = "cancelSkip";

    // Hide the book appointment button
    const bookAppointmentButton = document.getElementById("bookAppointment");
    bookAppointmentButton.textContent = "Submit";


    // Handle cancel button click
    document.getElementById('cancelSkip').addEventListener('click', function () {
        location.reload();
    });
}
$(document).ready(function () {
    $('#datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true
    }).on('changeDate', function (e) {
        // Handle date change
        const selectedDate = e.format('mm/dd/yyyy');
        $('#datepicker').val(selectedDate);
        updateAppointmentSlots(selectedDate);
    });

    function updateAppointmentSlots(date) {
     
        console.log('Selected date:', date);
       
    }
});


function fetchGetPatient() {
    const apiUrl = "https://eastus2.azure.data.mongodb-api.com/app/pac-application-sfnloyf/endpoint/GetPatient?username=john_smith";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('GetPatient API response:', data);
            if (data.firstPatient) {
                fillPatientInfo(data.firstPatient);
            } else {
                console.error('firstPatient not found in API response');
            }
        })
        .catch(error => {
            console.error('Error fetching GetPatient API:', error);
        });
}

// Function to fill the patient information on the page
function fillPatientInfo(firstPatient) {
    document.getElementById('patientName').value = `${firstPatient.FirstName} ${firstPatient.LastName}`;
    document.getElementById('phoneNumber').value = firstPatient.PhoneNumber;
    document.getElementById('patientDOB').value = new Date(firstPatient.DateOfBirth).toLocaleDateString();
    // document.getElementById('awv').checked = firstPatient.Flags.includes('AWV');
    // document.getElementById('dropped').checked = firstPatient.Flags.includes('DROPPED');
    // document.getElementById('idc10').checked = firstPatient.Flags.includes('IDC10');
    // document.getElementById('atrisk').checked = firstPatient.Flags.includes('ATRISK');
}


function fetchUserInfo() {
    const apiUrl = "https://eastus2.azure.data.mongodb-api.com/app/pac-application-sfnloyf/endpoint/FetchUserInfo?username=john_smith";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('FetchUserInfo API response:', data);
            if (data) {
                fillUserInfo(data);
            } else {
                console.error('User info not found in API response');
            }
        })
        .catch(error => {
            console.error('Error fetching FetchUserInfo API:', error);
        });
}

// Function to fill the user information on the page
function fillUserInfo(userInfo) {
    document.querySelector('.container .row .col-md-4 input[placeholder="PGS"]').value = userInfo.Practice.TIN;
    document.querySelector('.container .row .col-md-4 input[placeholder="Harry, Potter"]').value = userInfo.Practice.Providers.Provider1.Name;
    document.getElementById('patientName').value = `${userInfo.Practice.Providers.Provider1.Patients[0].FirstName} ${userInfo.Practice.Providers.Provider1.Patients[0].LastName}`;
    document.getElementById('phoneNumber').value = userInfo.Practice.Providers.Provider1.Patients[0].PhoneNumber;
    document.getElementById('patientDOB').value = new Date(userInfo.Practice.Providers.Provider1.Patients[0].DateOfBirth).toLocaleDateString();
    // document.getElementById('awv').checked = userInfo.Practice.Providers.Provider1.Patients[0].Flags.includes('AWV');
    // document.getElementById('tcm').checked = userInfo.Practice.Providers.Provider1.Patients[0].Flags.includes('TCM');
    // document.getElementById('dropped').checked = userInfo.Practice.Providers.Provider1.Patients[0].Flags.includes('DROPPED');
    // document.getElementById('idc10').checked = userInfo.Practice.Providers.Provider1.Patients[0].Flags.includes('IDC10');
    // document.getElementById('atrisk').checked = userInfo.Practice.Providers.Provider1.Patients[0].Flags.includes('ATRISK');
}


// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    populateAppointmentTable();
    //fetchGetPatient();
    fetchUserInfo();
    // Add event listener to skip button
    document.getElementById('skipButton').addEventListener('click', handleSkipButtonClick);

    //document.getElementById('bookAppointment').addEventListener('click', function () {
    //    fetchGetPatient();
    //});
});


