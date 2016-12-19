function convertW8BEN(data){

    convertedData =  {
                        "topmostSubform[0].Page1[0].p1-t1[0]"   : data.name,
                        "topmostSubform[0].Page1[0].p1-t2[0]"   : data.countryOfCitizenship,
                        "topmostSubform[0].Page1[0].p1-t3[0]"   : data.permResAddress,
                        "topmostSubform[0].Page1[0].p1-t4[0]"   : data.permResCity,
                        "topmostSubform[0].Page1[0].p1-t5[0]"   : data.permResCountry,
                        "topmostSubform[0].Page1[0].p1-t6[0]"   : data.mailingAddress,
                        "topmostSubform[0].Page1[0].p1-t7[0]"   : data.mailingCity,
                        "topmostSubform[0].Page1[0].p1-t8[0]"   : data.mailingCountry,
                        "topmostSubform[0].Page1[0].p1-t9[0]"   : data.usTaxPayerId,
                        "topmostSubform[0].Page1[0].p1-t10[0]"  : data.foreignTaxId,
                        "topmostSubform[0].Page1[0].p1-t11[0]"  : data.referenceNumbers,
                        "topmostSubform[0].Page1[0].p1-t12[0]"  : data.dateOfBirth,
                        // "topmostSubform[0].Page1[0].p1-t13[0]"  : data.benOwnerResidentOf,
                        // "topmostSubform[0].Page1[0].p1-t14[0]"  : data.provArticle,
                        // "topmostSubform[0].Page1[0].p1-t15[0]"  : data.claimPercentage,
                        // "topmostSubform[0].Page1[0].p1-t16[0]"  : data.typeOfIncome.substr(0,16),
                        // "topmostSubform[0].Page1[0].p1-t17[0]"  : data.typeOfIncome.substr(17,130),
                        // "topmostSubform[0].Page1[0].p1-t18[0]"  : data.termReason.substr(0,50),
                        // "topmostSubform[0].Page1[0].p1-t19[0]"  : data.termReason.substr(51,164),
                        // "topmostSubform[0].Page1[0].p1-t20[0]"  : data.termReason.substr(165,277),
                        "topmostSubform[0].Page1[0].p1-t21[0]"  : data.printName,
                        // "topmostSubform[0].Page1[0].p1-t22[0]"  : data.actingCapicity,
                        "topmostSubform[0]" : "no idea"
                    }
                    
                    for (var key in convertedData) {
                        !convertedData[key] ? convertedData[key] = '' : '' ;
                    }
                    
                    return convertedData;
}
module.exports.W8BEN = convertW8BEN;