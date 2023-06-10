/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */

import { Theme } from '@fluentui/react-components';
import { IInputs } from '../generated/ManifestTypes'


export interface IPcfContextServiceProps{
  context: ComponentFramework.Context<IInputs>;
  instanceid: number;
}


export class PcfContextService {
  instanceid:number;
  context: ComponentFramework.Context<IInputs>;
  entityname : string;

  constructor (props?:IPcfContextServiceProps) {
    if (props) {
      this.instanceid = props.instanceid
      this.entityname = (props.context as any).accessibility._customControlProperties.descriptor.Parameters.TargetEntityType // Probably unsuported
      this.context = props.context
    }
  }

  async getEntityMetadata (entityname:string) : Promise<ComponentFramework.PropertyHelper.EntityMetadata> {
    return this.context.utils.getEntityMetadata(entityname)
  }

  async getRecordImage (entityType:string, id:string, primaryimage:string) : Promise<string> {

    let record = await this.context.webAPI.retrieveRecord(entityType,id,`?$select=${primaryimage}`)
    return  record?.[primaryimage]
            ? `data:image/jpeg;base64,${record?.[primaryimage]}`
            : ''
  }

  async openRecord (entityName:string,entityId:string):Promise<ComponentFramework.NavigationApi.OpenFormSuccessResponse> {
    return this.context.navigation.openForm(
      {
        entityName: entityName,
        entityId: entityId
      }
    )
  }
}
