// Call the UPS API to get the delivery date for a package
function getUpsDeliveryDate(trackingNumber) {
  var data = {
    "Security": {
      "UsernameToken": {
        "Username": "",
        "Password": ""
      },
      "UPSServiceAccessToken": {
        "AccessLicenseNumber": ""
      }
    },
    "TrackRequest": {
      "Request": {
        "RequestAction": "Track",
        "RequestOption": "activity"
      },
      "InquiryNumber": trackingNumber
    }
  };

  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };

  data = JSON.parse(UrlFetchApp.fetch('https://onlinetools.ups.com/json/Track', options).getContentText())
  status = data.TrackResponse.Shipment.Package[0].Activity[0].Status.Description;
  date = data.TrackResponse.Shipment.Package[0].Activity[0].Date;

  if (status === "Delivered") {
    return date;
  } else {
    return "Null"
  }
}
