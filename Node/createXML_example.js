var fs = require('fs');

var et = require('elementtree');
var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;

var date, root, root1, etree, xml;

var UniqueID, Title, UserName, CurrentVersion, DateUpdate, Latitude,
Longitude, Summary, ApproachAndAnchorage, Description, NOAAImage;

date = new Date();

root1 = element('entries');

root = subElement(root1, 'entry');
//root = element('entry');
//root.set('xmlns', 'http://www.w3.org/2005/Atom');

UniqueID = subElement(root, 'UniqueID');
UniqueID.text = '54905789';

Title = subElement(root, 'Title');
Title.text = 'Friday Harbor';

UserName = subElement(root, 'UserName');
UserName.text = 'Chris';

CurrentVersion = subElement(root, 'CurrentVersion');
CurrentVersion.text = '0';

DateUpdated = subElement(root, 'DateUpdated');
DateUpdated.text = date;

Latitude = subElement(root, 'Latitude');
Latitude.text = '48.536755';

Longitude = subElement(root, 'Longitude');
Longitude.text = '-123.015203';

Summary = subElement(root, 'Summary');
Summary.text = 'This is the summary for Friday Harbor';

Approach = subElement(root, 'Approach')
Approach.text = 'This is the approach and anchorage you should take when approaching Friday Harbor.';

Description = subElement(root, 'Description');
Description.text = 'This is the description of Friday Harbor.';

NOAAImage = subElement(root, 'NOAAImage');
NOAAImage.text = 'This is the URL for the NOAA Image.';


etree = new ElementTree(root1);
xml = etree.write({'xml_declaration': true});
//console.log(xml);

fs.writeFile("./locations/54905789.xml", xml, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("The file was saved!");
  }
});
