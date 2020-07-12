sap.ui.define([
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        
    ], function(Controller,  JSONModel) {
    "use strict";
 
    var Controller = Controller.extend("sap.erp.epcb.Bar", {
        
        // need to grab the settings values to store in the MDO 
        // this object has the values that will be sent to the MDO
        oSettingsValues: {
            radioBtnGrp: "1", // grabbing the default first
            onSwitch: "true",// grabbing the default first
            checkBoxes: []
        },

        onInit : function (evt) {
            // demo model
            // add the reserved word "this" allows this variable to be called in other methods
            this.oModel = new JSONModel({
				child1: false,
				child2: false,
                child3: false,
                ccBoxdata: [{key: "5YOOO", text: "5YOOO"}],
                timeData: [
                    {key: "Weekly", text: "Weekly"},
                    {key: "Monthly", text: "Monthly"},
                    {key: "TwoMonths", text: "Two Months"}
                ],
                startDate: new Date(),
                endDate: new Date()
			});
			this.getView().setModel(this.oModel);
    
        },
     
        onAfterRendering : function(){

        },
  
        onSeriesSelected : function(oEvent){
            // grabs the text off the radio button
            var sTxt = oEvent.getSource().getButtons()[oEvent.getParameter("selectedIndex")].getText();
            this.oSettingsValues.radioBtnGrp = sTxt;
            console.log(this.oSettingsValues.radioBtnGrp);
        },
        onSwitchChanged : function(oEvent){
            console.log(oEvent.getParameter('state'));
            this.oSettingsValues.onSwitch = oEvent.getParameter('state');
        },
        onParentClicked: function (oEvent) {
            // this is all or non
            var bSelected = oEvent.getParameter("selected");
            console.log(bSelected);
            // simply SET all the children to whatever the parent is
            this.getView().byId("ckbox1").setSelected(bSelected);
            this.getView().byId("ckbox2").setSelected(bSelected);
            this.getView().byId("ckbox3").setSelected(bSelected);
        },
        
        onSaveSettings: function (oEvent) {
            // clean out or it cummulates
            this.oSettingsValues.checkBoxes = [];
            // set the properties
            this.oSettingsValues.checkBoxes.push({
                box1: this.getView().byId("ckbox1").getSelected(),
                box2: this.getView().byId("ckbox2").getSelected(),
                box3: this.getView().byId("ckbox3").getSelected()

            });
            console.log(this.oSettingsValues);

        },
        onTimeChange: function(oEvent){
            // them combo box - demo only 
            console.log(oEvent.getParameter("selectedItem").getText());
            console.log(oEvent.getParameter("selectedItem").getKey());
            this.getView().byId("startDate").setDateValue(new Date("06/28/2020"));
            this.getView().byId("endDate").setDateValue(new Date("07/04/2020"));
            this.oModel.startDate = "2020-06-28";
            this.oModel.endDate = "2020-07-04";
        },
        onCCchange: function(oEvent){
            console.log(oEvent.getParameter("selectedItem").getText());
            console.log(oEvent.getParameter("selectedItem").getKey());

        }
        
    });

    return Controller;

});