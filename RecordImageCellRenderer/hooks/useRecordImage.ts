/* eslint-disable no-undef */
import { useQuery } from '@tanstack/react-query'
import { usePcfContext } from '../services/PcfContext'
import { useMetadata } from './useMetadata'

export const useRecordImage = (entityType:string, id:string) => {
  const pcfcontext = usePcfContext()
  
  const { primaryimage } = useMetadata(pcfcontext.entityname)

  const { data, isLoading, isError } =
    useQuery<string, Error>(
      ['recordimage', pcfcontext.instanceid, id],
      () => pcfcontext.getRecordImage(entityType, id, primaryimage),
      {
        enabled: !!primaryimage,
        staleTime: Infinity
      }
    )

  return { imagesrc: data, isLoading, isError }
}


