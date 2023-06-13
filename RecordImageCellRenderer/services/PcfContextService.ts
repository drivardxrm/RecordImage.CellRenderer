/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */

import { Theme } from '@fluentui/react-components';
import { IInputs } from '../generated/ManifestTypes'


export interface IPcfContextServiceProps{
  context: ComponentFramework.Context<IInputs>
  entityname : string
  instanceid: string
  primarynamefield : string
  primaryimagefield : string
}


export class PcfContextService {
  instanceid:string
  context: ComponentFramework.Context<IInputs>
  entityname : string
  primarynamefield: string
  primaryimagefield : string

  constructor (props?:IPcfContextServiceProps) {
    if (props) {
      this.instanceid = props.instanceid
      this.entityname = props.entityname
      this.context = props.context
      this.primarynamefield = props.primarynamefield
      this.primaryimagefield = props.primaryimagefield
    }
  }



  async getRecordImage (entityId:string) : Promise<string> {
    //console.log('getRecordImage-' + this.entityname + '-' + entityId) 
    let record = await this.context.webAPI.retrieveRecord(this.entityname,entityId,`?$select=${this.primaryimagefield}`)

    return  record?.[this.primaryimagefield]
            ? `data:image/jpeg;base64,${record?.[this.primaryimagefield]}`
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='  //1 px transparent  https://png-pixel.com/
  }

  async openRecord (entityId:string):Promise<ComponentFramework.NavigationApi.OpenFormSuccessResponse> {
    return this.context.navigation.openForm(
      {
        entityName: this.entityname,
        entityId: entityId
      }
    )
  }
}
