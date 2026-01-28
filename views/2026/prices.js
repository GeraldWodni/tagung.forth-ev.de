// tagung.forth-ev.de preis einstellungen

module.exports = {
    conference: "Forth Tagung",
    year: 2026,
    registerButton: "Anmelden",
    myName: "meineTagung",
    operatorEmail: "secretary@forth-ev.de",
    operatorBankAccount: "HINWEIS: dieser Wert wird über eine Umgebungsvariable bereitgestellt",

    /* message to show after successful registration */
    successTemplate: function _successTemplate( { price } ) {
        return `Danke für Ihre Anmeldung!`
            //+ `\n Bitte überweisen Sie €${price} auf das Konto welches Sie in der Email finden.`
            + `\n In der Email finden Sie auch Ihren persönlichen 'meineTagung'-Link. Bitte speichern Sie diesen gleich als Bookmark,`
            + `\n denn mit ihm können Sie an der Tagung teilnehmen und Ihre Präsentationsdetails überarbeiten.`
            + `\n Die Email erhalten Sie von: ${process.env.SMTP_EMAIL}.`;
    },
    /* registration email text body */
    emailTemplate: function _emailTemplate( { prices, values, price, website } ) {
        return `Hotel: ${values.hotel}\nExtra Tage: ${values.extraDays}\nPreis (gesamt): ${price}`
            + ( price > 0 ? `\nBitte transferieren Sie den vollen Eurobetrag an:\n${process.env.OPERATOR_BANK_ACCOUNT.replace(/\\n/g, '\n')}` : '' )
            + ( prices.chatRegistration ? `\n\n${process.env.CHAT_REGISTRATION}` : '' )
            + `\n\nUm an der Konferenz teilzunehmen, und  Ihre Präsentation(en) selbst zu editieren verwenden Sie bitte folgendem Link: https://${website}/${prices.myName}/${values.editHash}`
            + `\n\nName: ${values.name}`
            + `\nAddress: ${values.address}`
            + `\nTelephone: ${values.telephone}`
            + `\nMitgliedsnummer: ${values.memberNumber}`
            + `\nEmail: ${values.email}`
            + `\n\nEntourage: ${values.partner}\nName: ${values.partnerName}\nAdresse: ${values.partnerAddress}`
            + `\n\nPräsentation: ${values.presentationTitle} Länge: ${values.presentationLength}\n${values.presentationDescription}`
            + `\n\nAnmerkung: ${values.remark}`;
    },
    meeting: {
        openRegistration: "2026-01-23",
        start: "2026-04-25",
        partnerComplete: 220,
        partnerWithout0: 220,
    },
    hotels: [
        {
            header: "Forth Tagung in der DHJ Jugendherberge (10.-12. April)",
            description: "Übernachten+Tagung in der Jugendherberge",
            modes: [
                { name: "Übernachtung Mehrbettzimmer + Tagungsbeitrag:", value: "Tagung+MultiRoom",  complete: 286.00, defaultMode: true },
                { name: "Übernachtung Einzelzimmer + Tagungsbeitrag:", value: "Tagung+SingleRoom", complete: 382.00 },
            ],
            extraDays: [{
                name: "Donnerstag (Tag0)",
                "single": 167,
                "double": 121,
            }],
        },
        {
            header: "Forth Tagung ohne Übernachtungen (10.-12. April)",
            description: "Tagung in der DHJ Jugendherberge, Übernachtung zu Hause oder selbst organisiert",
            modes: [
                { name: "Tagungsbeitrag:", value: "Tagung", complete: 150.00 },
            ],
            extraDays: [{
                name: "Donnerstag (Tag0)",
                "double": 52,
            }],
        },
    ]
}
