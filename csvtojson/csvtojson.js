function csvtojson(){}csvtojson.Split=function(line,COL_SEPARATOR){if(null==COL_SEPARATOR||"undefined"==typeof COL_SEPARATOR)throw"CSV Column separator is null.";for(var STATE={INIT:{id:0},READVAL:{id:1}},cells=[],value="",status=STATE.INIT,i=0;i<line.length;i++){var c=line[i];switch(c){case'"':status==STATE.INIT?(status=STATE.READVAL,value=""):status==STATE.READVAL&&(status=STATE.INIT,cells.push(value),value=null);break;case COL_SEPARATOR:status==STATE.INIT&&null!=value?(cells.push(value),value=""):status==STATE.READVAL&&(value+=c);break;default:STATE.READVAL,value+=c}}return cells},csvtojson.RecogniseCSVSeparator=function(rows){var tryToSplit=function(rows,colsep){for(var numCols=-1,i=1;i<rows.length&&10>i;i++){var cells=csvtojson.Split(rows[i],colsep),rowNumCols=cells.length;if(-1==numCols&&rowNumCols>1)numCols=rowNumCols;else if(numCols!=rowNumCols)return!1}return!0},SEPARATOR=";",foundSparator=tryToSplit(rows,SEPARATOR);if(foundSparator)return SEPARATOR;if(SEPARATOR=",",foundSparator=tryToSplit(rows,SEPARATOR))return SEPARATOR;throw"Cannot infer the CSV column separator."},csvtojson.prototype=function(){var _processHeader=function(header,colseparator){if(null==colseparator||"undefined"==typeof colseparator)throw"Cannot process the CSV header because the column separator is null";var headerNames=header.split(colseparator),fields=[];return headerNames.forEach(function(item,index){var name=item.replace(/\s/,"_"),field={name:name,label:item,index:index};fields.push(field),fields[name]=field}),fields};return{constructor:csvtojson,read:function(csvContent){var records=[],fields=null,rows=csvContent.split(/\r\n?/),separator=csvtojson.RecogniseCSVSeparator(rows);fields=_processHeader(rows[0],separator);for(var i=1;i<rows.length;i++){for(var row=rows[i],values=csvtojson.Split(row,separator),jsonRow=[],j=0;j<values.length;j++){var value=values[j];"undefined"==typeof fields[j];var key=fields[j].name;jsonRow[key]=value}records.push(jsonRow)}return{fields:fields,records:records}}}}();