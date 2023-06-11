import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { PAOneGridCustomizer } from "./types";

import * as React from "react";
import { cellEditorOverrides } from "./customizers/CellEditorOverrides";
import { generateCellRendererOverrides } from "./customizers/CellRendererOverrides";
import { IPcfContextServiceProps, PcfContextService } from "./services/PcfContextService";
import { QueryCache, QueryClient } from "@tanstack/react-query";

export class RecordImageCellRenderer implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    
    
    
    
    
    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        const eventName = context.parameters.EventName.raw;
       // const test = (context as any).appsettings.getAppSetting()
        console.log('init-' + eventName)
        if (eventName) {
            
            const contexttype = (context as any).accessibility._customControlProperties.contextToken.contextTokenType
            // 5 = Subgrid
            // 2 = Main entity view

            const entityname = contexttype == 2 ? 
                (context as any).accessibility._customControlProperties.contextToken.entityTypeName :
                (context as any).accessibility._customControlProperties.descriptor.Parameters.TargetEntityType 
                          
                        
            const pcfContextServiceProps:IPcfContextServiceProps = {
                context : context,
                entityname: entityname,
                instanceid: eventName
            } 

            const paOneGridCustomizer: PAOneGridCustomizer = { cellRendererOverrides: 
                generateCellRendererOverrides(pcfContextServiceProps)
            };
            (context as any).factory.fireEvent(eventName, paOneGridCustomizer);
        }
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        return React.createElement(React.Fragment);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
