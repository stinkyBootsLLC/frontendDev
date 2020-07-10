sap.ui.define([
        'sap/ui/core/mvc/Controller',
        
        'sap/ui/model/json/JSONModel',
        
    ], function(Controller,  JSONModel) {
    "use strict";

    var oSettingsValues = {
        radioBtnGrp: "1", // grabbing the default first
        onSwitch: "true",// grabbing the default first
        checkBoxes: []

    };

    var Controller = Controller.extend("sap.erp.epcb.Bar", {

        onInit : function (evt) {
      

            this.oModel = new JSONModel({
				child1: false,
				child2: false,
                child3: false,
                ccBoxdata: [{key: "5YOOO", text: "5YOOO"}],
                timeData: [{key: "week", text: "week"}],
                startDate: new Date(),
                endDate: new Date()
			});
			this.getView().setModel(this.oModel);
    
        },
     
        onAfterRendering : function(){
            // var datasetRadioGroup = this.getView().byId('datasetRadioGroup');

            // var seriesRadioGroup = this.getView().byId('seriesRadioGroup');
        },
  
        onSeriesSelected : function(oEvent){
            var txt = oEvent.getSource().getButtons()[oEvent.getParameter("selectedIndex")].getText();
            
            oSettingsValues.radioBtnGrp = txt;
            console.log(oSettingsValues.radioBtnGrp);
            
        },
        onDataLabelChanged : function(oEvent){
            oSettingsValues.onSwitch = oEvent.getParameter('state');
            // alert(oEvent.getParameter('state'));
                  
          
        },
        onParentClicked: function (oEvent) {
            // this is all or non
            var bSelected = oEvent.getParameter("selected");
            console.log(bSelected);
            this.oModel.setData({ 
                child1: bSelected, 
                child2: bSelected, 
                child3: bSelected,
                ccBoxdata: [{key: "5YOOO", text: "5YOOO"}],
                timeData: [{key: "week", text: "week"}],
                startDate: new Date(),
                endDate: new Date() 
            
            });

           

            

            
        },
        
        onSaveSettings: function (oEvent) {
            // clean out or it cummulates
            oSettingsValues.checkBoxes = [];
            oSettingsValues.checkBoxes.push({
                box1: this.getView().byId("ckbox1").getSelected(),
                box2: this.getView().byId("ckbox2").getSelected(),
                box3: this.getView().byId("ckbox3").getSelected()

            });
            console.log(oSettingsValues);

        },
        onTimeChange: function(oEvent){
            
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