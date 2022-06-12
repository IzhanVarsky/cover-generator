import {
  InputWrapper,
  Stack,
  Button,
  TextInput,
  RadioGroup,
  Radio,
  Switch,
  Chips,
  Chip,
  NumberInput,
  Text,
  Divider,
  Loader,
  Container,
} from '@mantine/core';
import Shape from './Shape';
import { useForm } from '@mantine/form';
import { Dropzone } from '@mantine/dropzone';
import { useOutletContext } from "@remix-run/react";
import { useState } from 'react';

export default function Form() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  const sendData = (data) => {
    setIsLoading(true);
    console.log('Audio file:', data.audio_file)
    if (data.audio_file === undefined) {
      // TODO: Отрисовать пользователю, что он не загрузил файл
      return
    }
    console.log('Send data to server:', data);
    const formData = new FormData()
    for (let key in data) {
      formData.append(key, data[key]);
    }
    console.log('FORMDATA:', formData);
    // TODO: сделать прогресс бар, хотя бы просто <progress/>
    $.ajax({
      url: "http://localhost:5001/generate",
      type: 'POST',
      data: formData,
      // context: this,
      processData: false,
      contentType: false,
      cache: false,
      success: (response) => {
        console.log('SUCC', response);
        setCovers(response.result);
        setIsLoading(false);
      },
      error: (e) => {
        console.log('ERR', e);
        setIsLoading(false);
      }
    });
  };

  const form = useForm({
    initialValues: {
      audio_file: undefined,
      track_artist: 'XXX',
      track_name: 'YYY',
      emotion: 'anger',
      gen_type: "1",
      use_captioner: "1",
      num_samples: 5,
      use_filters: false,
    },
  });

  return (
    <>
      <Shape style={{ height: '100%' }}>
        <form onSubmit={form.onSubmit(sendData)}>
          <Stack justify="space-around">
            <Text>Select music file</Text>
            <Dropzone
              multiple={false}
              accept={["audio/*"]}
              onDrop={(files) => form.setFieldValue('audio_file', files[0])}
            >
              {() => <Text color='lightgray'>Drag or click</Text>}
            </Dropzone>
            {form.values['audio_file']
              && <Text color='blue'>{form.values['audio_file'].name} is selected</Text>}
            <Divider my="sm" />
            <TextInput
              label="Artist name"
              required
              {...form.getInputProps('track_artist')}
            />
            <TextInput
              label="Track name"
              required
              {...form.getInputProps('track_name')}
            />
            <RadioGroup
              label="Generator type"
              required
              {...form.getInputProps('gen_type')}
            >
              <Radio value="1" label="1" />
              <Radio value="2" label="2" />
            </RadioGroup>
            <RadioGroup
              label="Captioner type"
              required
              {...form.getInputProps('use_captioner')}
            >
              <Radio value="1" label="1" />
              <Radio value="2" label="2" />
            </RadioGroup>
            <NumberInput
              placeholder="Number of covers"
              min={1}
              max={20}
              required
              {...form.getInputProps('num_samples')}
            />
            <InputWrapper label="Emotion">
              <Chips
                {...form.getInputProps('emotion')}
              >
                <Chip value="anger">😠</Chip>
                <Chip value="fear">😨</Chip>
                <Chip value="funny">😂</Chip>
                <Chip value="happy">🤗</Chip>
                <Chip value="lonely">😔</Chip>
                {/* TODO: Дополнить список */}
                {/* TODO: Сделать всплывающее окошко с названием при наведении */}
              </Chips>
            </InputWrapper>
            <Switch
              size="md"
              label="Use filters"
              {...form.getInputProps('use_filters')}
            />

            {isLoading
              ? <Container><Loader size='xl' /></Container>
              : <Button type='submit' variant='gradient'>Generate</Button>}
          </Stack>
        </form>
      </Shape>
    </>
  )
}