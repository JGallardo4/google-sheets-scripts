// Call the UPS API to get the delivery date for a package
function getUpsDeliveryDate(trackingNumber="1Z0204510446013262") {
  username = "";
  password = "";
  accessLicenseNumber = "";

  var data = {
    "Security": {
      "UsernameToken": {
        "Username": username,
        "Password": password
      },
      "UPSServiceAccessToken": {
        "AccessLicenseNumber": accessLicenseNumber
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

  try {
    data = JSON.parse(UrlFetchApp.fetch('https://onlinetools.ups.com/json/Track', options).getContentText());

    shipment = data.TrackResponse.Shipment;
    package = "";
    activity = "";
    status = "";
    date = "";

    if (shipment.Package.constructor === Array) {
      package = shipment.Package[0];
      Logger.log(shipment.Package[0]);
    } else {
      package = shipment.Package;
      Logger.log(shipment.Package.Activity);
    }

    if (package.Activity.constructor === Array) {
      activity = package.Activity[0];
    } else {
      activity = package.Activity;
    }

    status = activity.Status.Description;
    date = activity.Date;
  } catch (error) {
    Logger.log(error)
  }

  if (status === "Delivered") {
    Logger.log(date)
    return date;
  } else {
    Logger.log(status)
    Logger.log(date)
    return "null"
  }

}
