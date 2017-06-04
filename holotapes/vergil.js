var vergil = function() {
	this.banner="Willkommen bei Termlink von ROBCO Industries (TM)\n\n";
	this.root = function() {
		menuln("Protokolleintrag 01","protokoll1");
		menuln("Protokolleintrag 02","protokoll2");
		menuln("Protokolleintrag 03","protokoll3");
		menuln("Protokolleintrag 04","protokoll4");
		menuln(" > Scheinwerfersteuerung","lightControl");
	};
	this.protokoll1 = function() {
		println("Habe altes Terminal in Werkstatt gefunden. Musste repariert werden. Läuft jetzt.");
		println();
		println("Schwer zu tippen. Finger zu ggroß.");
		println();
		println("Suche noch immer Materail für Serumm. Letzte Hoffnung.");
		return ["root","root"];
	};
	this.protokoll2 = function() {
		println("MAtteriallien schweer zu finden. Leuchttendes Meeer zu mitgenommen von Krieg.");
		println("DHabe Foglen nicht volslständig bedachtt, habe nurr an Übelrleben gedacht, sicher vor allein, die mirr folgn wollen.");
		println();
		println("Vieleleicht können die Leute im Kraater helfen. Geissitgg instabil aber ofesntischtl immun gegen Strahlung. Holdrenn würde sie lieben.");
		println();
		println("Hoffentlih haben die eine größrere Tastutur.");
		return ["root","root"];
	};
	this.protokoll3 = function() {
		println("Kinddre des Atoms könnenn nicht helfen. Brauvhken auch verzweiifelt Maattterial, sind abber zu stlolz, es zuzugebne.");
		println();
		println("Verlieree gelllegnetlich Gefgühl in Gliedmßamen. Kurze Erinnerungslücckne. Versuvhce poistiiiiiv zu bleiben, aber wenn Zusztand weiter schlefchter wiiird ...");
		println();
		println("Muusss Serrumm bald repproduzieren.");
		return ["root","root"];
	};
	this.protokoll4 = function() {
		println("KAnn das Serum hier nicht herstellen.");
		println();
		println("Hab keiner Werkzewhge, Hännnde zu umgeschickkt für komplizierte Vorggänge. Tippen wirrrrrd schwieriger. Machtt mich zu wüütnd.");
		println();
		println("Komme nicht mehrr rein, um urrrsprüngliche sErrrumprooobe zu holen. Musss in Erwwägung ziehen, dass mein Zzustand dauerhaft sein könnnte.");
		return ["root","root"];
	};
	this.lightControl = function() {
		println("Standardisiertes Scheinwerfersteuerungs-BIOS");
		println("ADMIN: Virgils Fraktion");
		println("EINHEITEN VERBUNDEN: 1");
		println();
		println("Bitte auswählen:");
		var lightButtonText = this.lightState ? "Licht ausschalten" : "Licht einschalten";
		menuln(lightButtonText,"toggleLightScreen","toggleLight");
		menuln("Systemdiagnose","systemDiagnose");
		return ["root",""]
	};
	this.toggleLightScreen = function(screenType) {
		if (screenType == 1) {
			println("Scheinwerfer wird/werden heruntergefahren ...");
			printState("Fahre herunter ...");
		} else {
			println("Scheinwerferaktivierung nicht möglich, Operation läuft bereits.");
			printState("Aktivierung läuft ... <FEHLER: Scheinwerfer bereits aktiviert.");
		}
		return ["lightControl","lightControl"];
	};
	this.toggleLight = function() {
		if (this.lightState) {
			this.lightState=false;
			return 1;
		} else {
			return 2;
		}
	};
	this.systemDiagnose = function() {
		println("Systemdiagnose: 1 Scheinwerfer verknüpft");
		println("Knoten | Zustand | Status | Entfernung");
		println("---------------------");
		println("Scheinwerfer Online,Kein Eindringling entdeckt, 24.47m");
		return ["lightControl","lightControl"];
	};
	
	this.lightState=true;
};