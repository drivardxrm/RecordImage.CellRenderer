import { IInputs } from '../generated/ManifestTypes'


export interface IPcfContextServiceProps{
  context: ComponentFramework.Context<IInputs>
  instanceid: string
}


export class PcfContextService {
  instanceid:string
  context: ComponentFramework.Context<IInputs>


  constructor (props?:IPcfContextServiceProps) {
    if (props) {
      this.instanceid = props.instanceid
      this.context = props.context
    }
  }

  // Get the main entityname from the context
  getTargetEntityName ():string {

    const pageType = (this.context as any).factory._customControlProperties.pageType
            
    // Depending on pagetype, get the entityname
    return pageType == 'EntityList' ?  
        (this.context as any).page.entityTypeName :
        (this.context as any).factory._customControlProperties.descriptor.Parameters.TargetEntityType 

  }

  async getEntityMetadata (entityname:string) : Promise<ComponentFramework.PropertyHelper.EntityMetadata> {
    return this.context.utils.getEntityMetadata(entityname)
  }

  async getRecordImage (entityname:string, recordid:string, primaryimage:string) : Promise<string> {
    
    let record = await this.context.webAPI.retrieveRecord(entityname,recordid,`?$select=${primaryimage}`)

    return  record?.[primaryimage]
            ? `data:image/jpeg;base64,${record?.[primaryimage]}`
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='  //1 px transparent  https://png-pixel.com/
  }

  async openRecord (entityname:string, recordid:string):Promise<ComponentFramework.NavigationApi.OpenFormSuccessResponse> {
    return this.context.navigation.openForm(
      {
        entityName: entityname,
        entityId: recordid
      }
    )
  }
}
