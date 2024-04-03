<template>
  <main class="px-4 md:pl-10 md:pr-[270px] py-6">
    <n-breadcrumb class="mb-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">Главная</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        Privacy Policy
      </n-breadcrumb-item>
    </n-breadcrumb>

    <template v-if="data">
      <RichText :html="data" />
    </template>
    <template v-else>
      <h1 class="text-brand-black text-5xl mb-10 font-medium">
        Datenschutz bei Clavis-Schule
      </h1>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Wer wir sind
      </h2>
      <p class="text-brand-gray mb-10">
        Die Clavis Kunst und Wissenschaft Privatschule GmbH i.G. ist eine
        Nachmittagsschule inprivater Trägerschaft. Weitere Informationen über
        die Arbeit unserer Schule finden Sie im Bereich Über uns. Ausführliche
        Informationen zum rechtlichen Status unserer Schule finden Sie im
        Impressum und alle Kontaktmöglichkeiten auf unserer Kontakt-Seite.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Ihre Rechte
      </h2>
      <p class="text-brand-gray mb-10">
        Neben der detaillierten Darstellung, welche personenbezogenen Daten wir
        sammeln, wie und warum wir sie sammeln, enthält unsere
        Datenschutzerklärung im Abschnitt „Ihre Datenschutzrechte“ unten auf
        dieser Seite eine umfassende Darstellung ihrer gesetzlich
        festgeschriebenen Rechte beim Datenschutz.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Welche personenbezogenen Daten wir sammeln und warum wir sie sammeln
      </h2>
      <p class="text-brand-gray mb-10">
        Auf unserer Website erheben wir an verschiedenen Stellen
        personenbezogene Daten. Zum Beispiel, wenn Sie ein Kontakt-, Anmelde-,
        Feedback- oder Newsletter-Formular ausfüllen, wenn Sie für die Buchung
        von Kursen unsere Online-Terminbuchung nutzen oder im ClavisOnlineshop
        Kurse kaufen, werden personenbezogene Daten aufgenommen. In den
        folgenden Abschnitten erläutern wir im Detail, welche Daten aufgenommen
        und verarbeitet werden, welche rechtlichen Grundlagen hierfür vorliegen
        und wie Sie die Löschung der Daten veranlassen können. Als Privatschule
        sind wir zur Sammlung und Datenweitergabe an Dritte verpflichtet. Diese
        sind insbesondere deutsche und EU-Behörden, sowie aus steuerlichen
        Gründen unser Steuerberater und unsere Dozenten, die Zugriff auf die
        Daten unserer Schüler*Innen haben. Unsere Website nutzt desweitern zur
        Reichweitenmessung, Werbung und Seitengestaltung die Google-Webdienste
        Google Analytics, Google AdWords, Google Fonts und Google Maps. In den
        betreffenden Abschnitten unten wird erläutert, welche Daten dort
        gesammelt werden, bzw. wie Sie dies vermeiden können.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Kontakt-, Anmelde-, Feedback- und Newsletterformulare
      </h2>
      <p class="text-brand-gray mb-10">
        Wenn Sie uns per Kontaktformular, Anmelde-, Feedback- oder
        Newsletterformular personenbezogene Daten zukommen lassen, werden Ihre
        Angaben aus den Formularen inklusive der von Ihnen dort angegebenen
        Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
        Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne
        Ihre Einwilligung weiter. Die Verarbeitung der in die Formulare
        eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer
        Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung
        jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an
        uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
        Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt. Die von Ihnen
        in Formularen eingegebenen Daten verbleiben bei uns, bis Sie uns zur
        Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder
        der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener
        Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen –
        insbesondere Aufbewahrungsfristen – bleiben unberührt.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Der Clavis-Onlineshop
      </h2>
      <p class="text-brand-gray">
        Sie können im Onlineshop unserer Webseite Bestellungen in unserem Shop
        als registrierter Kunde tätigen. Eine Registrierung hat den Vorteil,
        dass Sie sich im Falle einer künftigen Bestellung direkt mit Ihrer
        E-Mail-Adresse und Ihrem Passwort in unserem Shop einloggen können, ohne
        Ihre Kontaktdaten erneut eingeben zu müssen. Ihre personenbezogenen
        Daten werden dabei in eine Eingabemaske eingegeben und an uns
        übermittelt und gespeichert. Wenn Sie über unsere Webseite eine
        Bestellung tätigen, so erheben wir im Shop zunächst folgende Daten:
      </p>
      <ul class="text-brand-gray">
        <li>Anrede, Vorname, Nachname,</li>
        <li>eine gültige E-Mail-Adresse,</li>
        <li>Anschrift,</li>
        <li>Telefonnummer optional.</li>
      </ul>
      <p class="text-brand-gray">Die Erhebung dieser Daten erfolgt,</p>
      <ul class="text-brand-gray">
        <li>um Sie als unseren Kunden identifizieren zu können;</li>
        <li>
          um Ihre Bestellung bearbeiten, erfüllen und abwickeln zu können;
        </li>
        <li>zur Korrespondenz mit Ihnen;</li>
        <li>zur Rechnungsstellung;</li>
        <li>
          zur Abwicklung von evtl. vorliegenden Haftungsansprüchen, sowie der
          Geltendmachung etwaiger Ansprüche gegen Sie;
        </li>
        <li>
          um die technische Administration unserer Webseite sicherzustellen;
        </li>
        <li>um unsere Kundendaten zu verwalten.</li>
      </ul>
      <p class="text-brand-gray mb-10">
        Im Rahmen des Bestellprozesses wird eine Einwilligung von Ihnen zur
        Verarbeitung dieser Daten eingeholt. Die Datenverarbeitung erfolgt auf
        Ihre Bestellung und/oder Registrierung hin und ist nach Art. 6 Abs. 1 S.
        1 lit. b DSGVO zu den genannten Zwecken für die angemessene Bearbeitung
        Ihrer Bestellung und für die beidseitige Erfüllung von Verpflichtungen
        aus dem Kaufvertrag erforderlich. Die für die Abwicklung Ihrer
        Bestellung von uns erhobenen personenbezogenen Daten werden bis zum
        Ablauf der gesetzlichen Aufbewahrungspflicht gespeichert und danach
        gelöscht, es sei denn, dass wir nach Artikel 6 Abs. 1 S. 1 lit. c DSGVO
        aufgrund von steuer- und handelsrechtlichen Aufbewahrungs- und
        Dokumentationspflichten (aus HGB, StGB oder AO) zu einer längeren
        Speicherung verpflichtet sind oder Sie in eine darüber hinausgehende
        Speicherung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO eingewilligt haben.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Zahlungsabwicklung
      </h2>
      <p class="text-brand-gray mb-10">
        Paypal Bei Bezahlung mit PayPal erfolgt die Übermittlung Ihrer Daten an
        PayPal erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO
        (Einwilligung) und Art. 6 Abs. 1 lit. b DSGVO (Verarbeitung zur
        Erfüllung eines Vertrags). Sie haben die Möglichkeit, Ihre Einwilligung
        zur Datenverarbeitung jederzeit zu widerrufen. Ein Widerruf wirkt sich
        auf die Wirksamkeit von in der Vergangenheit liegenden
        Datenverarbeitungsvorgängen nicht aus. Bei der Zahlung mit PayPal werden
        die von Ihnen bei PayPal hinterlegten Bankdaten von PayPal zur Zahlung
        verwendet. Auf diese Daten haben wir keinen Zugriff. Mehr Informationen
        zu PayPal und deren Datenschutzgrundsätzen finden sie hier:
        <span class="break-all">
          https://www.paypal.com/de/webapps/mpp/ua/privacy-full
        </span>
        .
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Stripe
      </h2>
      <p class="text-brand-gray mb-10">
        Wir bieten die Möglichkeit, den Zahlungsvorgang über den
        Zahlungsdienstleister Stripe, ℅ Legal Process, 510,Townsend St., San
        Francisco, CA 94103 (Stripe) abzuwickeln. Dies entspricht unserem
        berechtigten Interesse, eine effiziente und sichere Zahlungsmethode
        anzubieten (Art. 6 Abs. 1 lit. f DSGVO). In dem Zusammenhang geben wir
        folgende Daten an Stripe weiter, soweit es für die Vertragserfüllung
        erforderlich ist (Art. 6 Abs. 1 lit b. DSGVO). Name des Karteninhabers
        E-Mail-Adresse Kundennummer Bestellnummer Bankverbindung
        Kreditkartendaten Gültigkeitsdauer der Kreditkarte Prüfnummer der
        Kreditkarte (CVC) Datum und Uhrzeit der Transaktion Transaktionssumme
        Name des Anbieters Ort Die Verarbeitung der unter diesem Abschnitt
        angegebenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben.
        Ohne die Übermittlung Ihrer personenbezogenen Daten können wir eine
        Zahlung über Stripe nicht durchführen. [Es besteht für Sie die
        Möglichkeit, eine andere Zahlungsmethode zu wählen.] Stripe nimmt bei
        Datenverarbeitungstätigkeiten eine Doppelrolle als Verantwortlicher und
        Auftragsverarbeiter ein. Als Verantwortlicher verwendet Stripe Ihre
        übermittelten Daten zur Erfüllung regulatorischer Verpflichtungen. Dies
        entspricht dem berechtigten Interesse Stripes (gem. Art. 6 Abs. 1 lit. f
        DSGVO) und dient der Vertragsdurchführung (gem. Art. 6 Abs. 1 lit. b
        DSGVO). Wir haben auf diesen Prozess keinen Einfluss. Als
        Auftragsverarbeiter fungiert Stripe, um Transaktionen innerhalb der
        Zahlungsnetzwerke abschließen zu können. Im Rahmen des
        Auftragsverarbeitungsverhältnisses wird Stripe ausschließlich nach
        unserer Weisung tätig und wurde im Sinne des Art. 28 DSGVO vertraglich
        verpflichtet, die datenschutzrechtlichen Bestimmungen einzuhalten.
        Stripe hat Compliance-Maßnahmen für internationale Datenübermittlungen
        umgesetzt. Diese gelten für alle weltweiten Aktivitäten, bei denen
        Stripe personenbezogene Daten von natürlichen Personen in der EU
        verarbeitet. Diese Maßnahmen basieren auf den EUStandardvertragsklauseln
        (SCCs). Weitere Informationen zu Widerspruchs- und
        Beseitigungsmöglichkeiten gegenüber Stripe finden Sie unter:
        https://stripe.com/privacy-center/legal Ihre Daten werden von uns bis
        zum Abschluss der Zahlungsabwicklung gespeichert. Dazu zählt auch der
        Zeitraum der für die Bearbeitung von Rückerstattungen,
        Forderungsmanagement und Betrugsprävention erforderlich ist.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Server-Log-Dateien
      </h2>
      <p class="text-brand-gray">
        Der Provider dieser Website erhebt und speichert automatisch
        Informationen in so genannten Server-Log-Dateien, die Ihr Browser
        automatisch an uns übermittelt. Dies sind:
      </p>
      <ul class="text-brand-gray">
        <li>Browsertyp und Browserversion</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p class="text-brand-gray mb-10">
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
        vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit.
        b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags
        oder vorvertraglicher Maßnahmen gestattet.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Cookies
      </h2>
      <p class="text-brand-gray">
        Diese Website erfüllt die Pflicht zum Hinweis auf den Einsatz von
        Cookies. Durch die Verwendung von Cookies können Internetseiten
        nutzerfreundlich, effektiv und sicherer gemacht werden. Dabei werden
        Textdateien mit Informationspunkten auf Basis von Nutzeraktivitäten
        temporär im Browser des Benutzers abgelegt. Besuchs-Präferenzen und
        Webseiten-Einstellungen können somit definiert und gespeichert werden.
        Jeder Browser unterscheidet sich in der Art, wie er die
        Cookie-Einstellungen verwaltet. Diese ist in dem Hilfemenü jedes
        Browsers beschrieben, welches Ihnen erläutert, wie Sie Ihre
        Cookie-Einstellungen ändern können. Diese finden Sie für die jeweiligen
        Browser unter den folgenden Links:
      </p>
      <ul class="text-brand-gray break-all">
        <li>
          Internet Explorer:
          https://support.microsoft.com/de-de/help/17442/windowsinternet-explorer-delete-manage-cookies
        </li>
        <li>Safari: https://support.apple.com/kb/ph31411?locale=de_DE</li>
        <li>
          Chrome: https://support.google.com/chrome/answer/95647?hl=de&hlrm=en
        </li>
        <li>
          Firefox
          https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen
        </li>
        <li>Opera: http://help.opera.com/Windows/10.20/de/cookies.html</li>
      </ul>
      <p class="text-brand-gray mb-10">
        Mit der Speicherung von Cookies ermöglichen Sie dieser Homepage
        inhaltliche und strukturelle Anpassung an die individuellen
        Besucherbedürfnisse. Webseiteneinstellungen werden zeitlich befristet
        gespeichert und bei erneutem Besuch abgerufen. Mit Anwendung der DSGVO
        2018 sind Webmaster dazu verpflichtet, der unter
        https://eudatenschutz.org/ veröffentlichten Grundverordnung Folge zu
        leisten und seine Nutzer entsprechend über die Erfassung und Auswertung
        von Daten in Kenntnis zu setzen. Die Rechtmäßigkeit der Verarbeitung ist
        in Kapitel 2, Artikel 6 der DSGVO begründet.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Google Analytics
      </h2>
      <p class="text-brand-gray mb-10">
        Soweit Sie Ihre Einwilligung erklärt haben, wird auf dieser Website
        Google Analytics eingesetzt, einen Webanalysedienst der Google Inc.
        („Google“). Die Nutzung umfasst die Betriebsart „Universal Analytics“.
        Hierdurch ist es möglich, Daten, Sitzungen und Interaktionen über
        mehrere Geräte hinweg einer pseudonymen User-ID zuzuordnen und so die
        Aktivitäten eines Nutzers geräteübergreifend zu analysieren. Google
        Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer
        gespeichert werden und die eine Analyse der Benutzung der Website durch
        Sie ermöglichen. Die durch das Cookie erzeugten Informationen über Ihre
        Benutzung dieser Website werden in der Regel an einen Server von Google
        in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der
        IP-Anonymisierung auf dieser Website, wird Ihre IP-Adresse von Google
        jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in
        anderen Vertragsstaaten des Abkommens über den Europäischen
        Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle
        IP-Adresse an einen Server von Google in den USA übertragen und dort
        gekürzt. Wir weisen Sie darauf hin, dass auf dieser Webseite Google
        Analytics um eine IP-Anonymisierung erweitert wurde, um eine
        anonymisierte Erfassung von IP-Adressen (sog. IP-Masking) zu
        gewährleisten. Die im Rahmen von Google Analytics von Ihrem Browser
        übermittelte IP-Adresse wird nicht mit anderen Daten von Google
        zusammengeführt. Nähere Informationen zu Nutzungsbedingungen und
        Datenschutz finden Sie unter
        <span class="break-all">https://www.google.com/analytics/terms/de.html</span>
        bzw. unter https://policies.google.com/?hl=de.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Zwecke der Verarbeitung
      </h2>
      <p class="text-brand-gray mb-10">
        Im Auftrag des Betreibers dieser Website wird Google diese Informationen
        benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die
        Websiteaktivitäten zusammenzustellen und um weitere mit der
        Websitenutzung und der Internetnutzung verbundene Dienstleistungen
        gegenüber dem Websitebetreiber zu erbringen.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Rechtsgrundlage
      </h2>
      <p class="text-brand-gray mb-10">
        Die Rechtsgrundlage für den Einsatz von Google Analytics ist ihre
        Einwilligung gemäß Art. 6 Abs. 1 S.1 lit. a DSGVO. Empfänger /
        Kategorien von Empfängern Der Empfänger der erhobenen Daten ist Google.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Übermittlung in Drittstaaten
      </h2>
      <p class="text-brand-gray mb-10">
        Die personenbezogenen Daten werden unter dem EU-US Privacy Shield auf
        Grundlage des Angemessenheitsbeschlusses der Europäischen Kommission in
        die USA übermittelt. Das Zertifikat können Sie hier abrufen.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Dauer der Datenspeicherung
      </h2>
      <p class="text-brand-gray mb-10">
        Die von uns gesendeten und mit Cookies, Nutzerkennungen (z. B. User-ID)
        oder Werbe-IDs verknüpften Daten werden nach 14 Monaten automatisch
        gelöscht. Die Löschung von Daten, deren Aufbewahrungsdauer erreicht ist,
        erfolgt automatisch einmal im Monat.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Betroffenenrechte
      </h2>
      <p class="text-brand-gray mb-10">
        Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft
        widerrufen, indem sie die Speicherung der Cookies durch eine
        entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen
        Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht
        sämtliche Funktionen dieser Website vollumfänglich werden nutzen können.
        Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten
        und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer
        IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google
        verhindern, indem Sie das Browser-Addon herunterladen und installieren.
        Opt-Out-Cookies verhindern die zukünftige Erfassung Ihrer Daten beim
        Besuch dieser Website. Um die Erfassung durch Universal Analytics über
        verschiedene Geräte hinweg zu verhindern, müssen Sie das Opt-Out auf
        allen genutzten Systemen durchführen. Wenn Sie hier klicken, wird das
        Opt-Out-Cookie gesetzt: Google Analytics deaktivieren
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Google AdWords
      </h2>
      <p class="text-brand-gray mb-10">
        Wir haben auf dieser Internetseite Google AdWords integriert. Google
        AdWords ist ein Dienst zur Internetwerbung, der es Werbetreibenden
        gestattet, sowohl Anzeigen in den Suchmaschinenergebnissen von Google
        als auch im Google-Werbenetzwerk zu schalten. Google AdWords ermöglicht
        es einem Werbetreibenden, vorab bestimmte Schlüsselwörter festzulegen,
        mittels derer eine Anzeige in den Suchmaschinenergebnissen von Google
        ausschließlich dann angezeigt wird, wenn der Nutzer mit der Suchmaschine
        ein schlüsselwortrelevantes Suchergebnis abruft. Im Google-Werbenetzwerk
        werden die Anzeigen mittels eines automatischen Algorithmus und unter
        Beachtung der zuvor festgelegten Schlüsselwörter auf themenrelevanten
        Internetseiten verteilt. Betreibergesellschaft der Dienste von Google
        AdWords ist die Google Inc., 1600 Amphitheatre Pkwy, Mountain View, CA
        94043-1351, USA. Der Zweck von Google AdWords ist die Bewerbung unserer
        Internetseite durch die Einblendung von interessenrelevanter Werbung auf
        den Internetseiten von Drittunternehmen und in den
        Suchmaschinenergebnissen der Suchmaschine Google und eine Einblendung
        von Fremdwerbung auf unserer Internetseite. Gelangt eine betroffene
        Person über eine Google-Anzeige auf unsere Internetseite, wird auf dem
        informationstechnologischen System der betroffenen Person durch Google
        ein sogenannter Conversion-Cookie abgelegt. Was Cookies sind, wurde oben
        bereits erläutert. Ein Conversion-Cookie verliert nach dreißig Tagen
        seine Gültigkeit und dient nicht zur Identifikation der betroffenen
        Person. Über den Conversion-Cookie wird, sofern das Cookie noch nicht
        abgelaufen ist, nachvollzogen, ob bestimmte Unterseiten, beispielsweise
        der Warenkorb von einem Online-Shop-System, auf unserer Internetseite
        aufgerufen wurden. Durch den Conversion-Cookie können sowohl wir als
        auch Google nachvollziehen, ob eine betroffene Person, die über eine
        AdWords-Anzeige auf unsere Internetseite gelangt ist, einen Umsatz
        generierte, also einen Warenkauf vollzogen oder abgebrochen hat. Die
        durch die Nutzung des Conversion-Cookies erhobenen Daten und
        Informationen werden von Google verwendet, um Besuchsstatistiken für
        unsere Internetseite zu erstellen. Diese Besuchsstatistiken werden durch
        uns wiederum genutzt, um die Gesamtanzahl der Nutzer zu ermitteln,
        welche über AdWords-Anzeigen an uns vermittelt wurden, also um den
        Erfolg oder Misserfolg der jeweiligen AdWords-Anzeige zu ermitteln und
        um unsere AdWordsAnzeigen für die Zukunft zu optimieren. Weder unser
        Unternehmen noch andere Werbekunden von Google-AdWords erhalten
        Informationen von Google, mittels derer die betroffene Person
        identifiziert werden könnte. Mittels des Conversion-Cookies werden
        personenbezogene Informationen, beispielsweise die durch die betroffene
        Person besuchten Internetseiten, gespeichert. Bei jedem Besuch unserer
        Internetseiten werden demnach personenbezogene Daten, einschließlich der
        IPAdresse des von der betroffenen Person genutzten Internetanschlusses,
        an Google in den Vereinigten Staaten von Amerika übertragen. Diese
        personenbezogenen Daten werden durch Google in den Vereinigten Staaten
        von Amerika gespeichert. Google gibt diese über das technische Verfahren
        erhobenen personenbezogenen Daten unter Umständen an Dritte weiter. Die
        betroffene Person kann die Setzung von Cookies durch unsere
        Internetseite, wie oben bereits dargestellt, jederzeit mittels einer
        entsprechenden Einstellung des genutzten Internetbrowsers verhindern und
        damit der Setzung von Cookies dauerhaft widersprechen. Eine solche
        Einstellung des genutzten Internetbrowsers würde auch verhindern, dass
        Google einen Conversion-Cookie auf dem informationstechnologischen
        System der betroffenen Person setzt. Zudem kann ein von Google AdWords
        bereits gesetzter Cookie jederzeit über den Internetbrowser oder andere
        Softwareprogramme gelöscht werden. Ferner besteht für die betroffene
        Person die Möglichkeit, der interessenbezogenen Werbung durch Google zu
        widersprechen. Hierzu muss die betroffene Person von jedem der von ihr
        genutzten Internetbrowser aus den Link www.google.de/settings/ads
        aufrufen und dort die gewünschten Einstellungen vornehmen. Weitere
        Informationen und die geltenden Datenschutzbestimmungen von Google
        können unter
        <span class="break-all">https://www.google.de/intl/de/policies/privacy/</span>
        abgerufen werden.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Google Web Fonts
      </h2>
      <p class="text-brand-gray mb-10">
        Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so
        genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf
        einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren
        Browsercache, um Texte und Schriftarten korrekt anzuzeigen. Zu diesem
        Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern
        von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass
        über Ihre IP-Adresse unsere Website aufgerufen wurde. Die Nutzung von
        Google Web Fonts erfolgt im Interesse einer einheitlichen und
        ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein
        berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Wenn
        Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von
        Ihrem Computer genutzt. Weitere Informationen zu Google Web Fonts finden
        Sie unter https://developers.google.com/fonts/faq und in der
        Datenschutzerklärung von Google:
        https://www.google.com/policies/privacy/.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Google Maps
      </h2>
      <p class="text-brand-gray mb-10">
        Auf unserer Kontakt-Seite haben wir ein Landkarte des Dienstes “Google
        Maps” des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain
        View, CA 94043, USA, eingebunden. Hier können zu den verarbeiteten Daten
        IP-Adressen und Standortdaten der Nutzer gehören, die jedoch nicht ohne
        deren Einwilligung, im Regelfall bei durch Einstellungen bei ihren
        Mobilgeräte, erhoben werden. Die Daten können in den USA verarbeitet
        werden. Weitere Informationen finden Sie in der Datenschutzerklärung von
        Google https://www.google.com/policies/privacy/.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Ihre Datenschutzrechte
      </h2>
      <p class="text-brand-gray">Sie haben das Recht:</p>
      <ul class="text-brand-gray mb-10">
        <li>
          gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten
          personenbezogenen Daten zu verlangen. Insbesondere können Sie Auskunft
          über die Verarbeitungszwecke, die Kategorie der personenbezogenen
          Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten
          offengelegt wurden oder werden, die geplante Speicherdauer, das
          Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der
          Verarbeitung oder Widerspruch, das Bestehen eines Beschwerderechts,
          die Herkunft Ihrer Daten, sofern diese nicht bei mir erhoben wurden,
          sowie über das Bestehen einer automatisierten Entscheidungsfindung
          einschließlich Profiling und ggf. aussagekräftigen Informationen zu
          deren Einzelheiten verlangen;• gemäß Art. 16 DSGVO unverzüglich die
          Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns
          gespeicherten personenbezogenen Daten zu verlangen;
        </li>
        <li>
          gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten
          personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung
          zur Ausübung des Rechts auf freie Meinungsäußerung und Information,
          zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des
          öffentlichen Interesses oder zur Geltendmachung, Ausübung oder
          Verteidigung von Rechtsansprüchen erforderlich ist;
        </li>
        <li>
          gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen, soweit die Richtigkeit der Daten
          von Ihnen bestritten wird, die Verarbeitung unrechtmäßig ist, Sie aber
          deren Löschung ablehnen und wir die Daten nicht mehr benötigen, Sie
          jedoch diese zur Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen benötigen oder Sie gemäß Art.21 DSGVO Widerspruch
          gegen die Verarbeitung eingelegt haben;
        </li>
        <li>
          gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns
          bereitgestellt haben, in einem strukturierten, gängigen und
          maschinenlesebaren Format zu erhalten oder die Übermittlung an einen
          anderen Verantwortlichen zu verlangen;
        </li>
        <li>
          gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit
          gegenüber uns zu widerrufen. Dies hat zur Folge, dass wir die
          Datenverarbeitung, die auf dieser Einwilligung beruhte, für die
          Zukunft nicht mehr fortführen dürfen und
        </li>
        <li>
          gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren. In
          der Regel können Sie sich hierfür an die Aufsichtsbehörde Ihres
          üblichen Aufenthaltsortes oder Arbeitsplatzes oder unseres
          Firmensitzes wenden.
        </li>
      </ul>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Widerspruchsrecht
      </h2>
      <p class="text-brand-gray mb-10">
        Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten
        Interessen gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO verarbeitet werden,
        haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die
        Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit dafür
        Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben oder
        sich der Widerspruch gegen Direktwerbung richtet. Im letzteren Fall
        haben Sie ein generelles Widerspruchsrecht, das ohne Angabe einer
        besonderen Situation von uns umgesetzt wird. Möchten Sie von Ihrem
        Widerrufs- oder Widerspruchsrecht Gebrauch machen, genügt eine E- Mail
        an: info@clavis-schule.de
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Datensicherheit
      </h2>
      <p class="text-brand-gray mb-10">
        Wir verwenden innerhalb des Website-Besuchs das verbreitete
        SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils
        höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird.
        In der Regel handelt es sich dabei um eine 256 Bit Verschlüsselung.
        Falls Ihr Browser keine 256-Bit Verschlüsselung unterstützt, greifen wir
        stattdessen auf 128-Bit v3 Technologie zurück. Ob eine einzelne Seite
        unseres Internetauftrittes verschlüsselt übertragen wird, erkennen Sie
        an der geschlossenen Darstellung des Schüssel- beziehungsweise Schloss-
        Symbols in der unteren Statusleiste Ihres Browsers. Wir bedienen uns im
        Übrigen geeigneter technischer und organisatorischer
        Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche
        Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder
        gegen den unbefugten Zugriff Dritter zu schützen. Unsere
        Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung
        fortlaufend verbessert.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Aktualität und Änderung dieser Datenschutzerklärung
      </h2>
      <p class="text-brand-gray mb-10">
        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai
        2018. Durch die Weiterentwicklung unserer Website und Angebote darüber
        oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher
        Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Quellen dieser Datenschutzerklärung
      </h2>
      <p class="text-brand-gray mb-10">
        Um diese Datenschutzerklärung maßgeschneidert auf die Gegebenheiten
        unseres Webauftrittes im Zusammenhang mit unserem Unternehmen, der
        Clavis Kunst und Wissenschaft Privatschule GmbH i.G., formulieren zu
        können, haben wir auf verschiedene Webangebote zugegriffen und diese auf
        unsere spezifischen Bedürfnisse zugeschnitten. Im Folgenden nennen wir
        die Quellen und die diesbezüglichen Abschnitte in unserer
        Datenschutzerklärung: Der Clavis-Onlineshop, Ihre Datenschutzrechte,
        Wiederspruchsrecht, Datensicherheit und Aktualität dieser
        Datenschutzerklärung: Muster-Datenschutzerklärung von RA Andreas
        Gerstel, anwaltblog24.de; Stripe: Muster-Datenschutzerklärung von
        opr.vc; Cookies: Cookie- Hinweis von eigene-homepage.net; Google
        Analytics: Datenschutzhinweis von intersoftconsulting.de; Google
        Adwords: Datenschutzerklärungs-Generator der Deutschen Gesellschaft für
        Datenschutz GmbH (DGD) in Kooperation mit dem Datenschutzanwalt
        Christian Solmecke.
      </p>
    </template>
  </main>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

import RichText from '@/components/cms/blocks/misc/RichText.vue'
import { getApiAddress } from '@/utils/getApiAddress'

const { locale } = useI18n()

const { data } = await useAsyncData(
  'products',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/legal/`), {
      params: {
        locale: locale.value,
        fields: '*',
        name: 'Datenschultz',
      },
    }).then(req => req.items[0].contents),
  { watch: [locale], deep: true },
)
</script>
<style scoped lang="scss">
ul {
  list-style-type: disc;
  margin-left: 1rem;
  margin-bottom: 0.75rem;
}
</style>
