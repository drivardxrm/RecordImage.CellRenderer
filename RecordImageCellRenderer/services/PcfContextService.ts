/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */

import { Theme } from '@fluentui/react-components';
import { IInputs } from '../generated/ManifestTypes'


export interface IPcfContextServiceProps{
  context: ComponentFramework.Context<IInputs>;
  entityname : string;
  instanceid: string;
}


export class PcfContextService {
  instanceid:string;
  context: ComponentFramework.Context<IInputs>;
  entityname : string;

  constructor (props?:IPcfContextServiceProps) {
    if (props) {
      this.instanceid = props.instanceid
      this.entityname = props.entityname
      this.context = props.context
    }
  }

  async getEntityMetadata (entityname:string) : Promise<ComponentFramework.PropertyHelper.EntityMetadata> {
    console.log('getEntityMetadata-' + entityname)
    return this.context.utils.getEntityMetadata(entityname)
  }

  async getRecordImage (entityType:string, id:string, primaryimage:string) : Promise<string> {
    console.log('getRecordImage-' + entityType + '-' + id) 
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
