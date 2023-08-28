import { useQuery } from '@tanstack/react-query'
import { usePcfContext } from '../services/PcfContext'
import { useMetadata } from './useMetadata'

export const useRecordImage = (entityname:string,recordid:string) => {
  const pcfcontext = usePcfContext()
  
  const { primaryimage } = useMetadata(entityname)

  const { data, isLoading, isError } =
    useQuery<string, Error>(
      ['recordimage', pcfcontext.instanceid, entityname, recordid],
      () => pcfcontext.getRecordImage(entityname, recordid, primaryimage),
      {
        enabled: !!primaryimage,
        staleTime: Infinity
      }
    )

  return { imagesrc: data, isLoading, isError }
}


