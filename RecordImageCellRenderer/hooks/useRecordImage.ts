import { useQuery } from '@tanstack/react-query'
import { usePcfContext } from '../services/PcfContext'


export const useRecordImage = (id:string) => {
  const pcfcontext = usePcfContext()

  const { data, isLoading, isError } =
    useQuery<string, Error>(
      ['recordimage', pcfcontext.instanceid, id],
      () => pcfcontext.getRecordImage(id),
      {
        staleTime: Infinity
      }
    )

  return { imagesrc: data, isLoading, isError }
}


