import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { CitiesService } from '../../../shared/services/api/cities/CitiesService';
import { useDebounce } from '../../../shared/hooks';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCity {
  isExternalLoading: boolean;
}

export const AutoCompleteCity = ({ isExternalLoading = false }: IAutoCompleteCity) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  const { debounce } = useDebounce();

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue:() => selectedId,
      setValue:(_, newSelectedId) => setSelectedId(newSelectedId)
    })
  }, [registerField, selectedId, fieldName])

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
          setOptions(result.data.map((city) => ({ id: city.id, label: city.nome })));
        }
      });
    });
  }, [busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find((option) => option.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      value={autoCompleteSelectedOption}
      disabled={isExternalLoading}
      disablePortal
      loadingText="Carregando..."
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loading={isLoading}
      popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28} /> : undefined}
      options={options}
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca('');
        clearError()
      }}
      renderInput={(params) => (
        <TextField {...params} label="Cidade" error={!!error} helperText={error} />
      )}
    />
  );
};
