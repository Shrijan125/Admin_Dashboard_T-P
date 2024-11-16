'use client';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { SingleImageDropzone } from './SingleImageDropZone';
import Image from 'next/image';
import { Loader2, Trash2 } from 'lucide-react';
import { useEdgeStore } from '@/lib/edgestore';
import {
  add_recruiters,
  update_recruiters,
} from '@/app/actions/recruiters/recruiters';
import { useToast } from '@/hooks/use-toast';

const RecruitersForm = ({
  imageUrl,
  companyname,
  id,
}: {
  imageUrl: string;
  companyname: string;
  id?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [imgloading, setImgLoading] = useState(false);
  const [name, setNames] = useState<string>(companyname);
  const [file, setFile] = useState<File>();
  const [urls, setUrls] = useState<string>(imageUrl);
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();
  async function handleAction(formData: FormData) {
    if (file || urls) {
      try {
        setLoading(true);
        let uploadedUrl = urls;
        if (!uploadedUrl && file) {
          const res = await edgestore.myPublicImages.upload({
            file,
          });
          uploadedUrl = res.url;
        }
        if (!uploadedUrl) {
          throw new Error('Error while Uploading Image');
        }
        if (id) {
          try {
            await update_recruiters({
              formdata: formData,
              id,
              urls: urls || uploadedUrl,
            });
            setUrls(uploadedUrl || urls);
          } catch (error) {
            if (uploadedUrl != urls) {
              await edgestore.myPublicImages.delete({ url: uploadedUrl });
            }
            toast({
              description:
                (error as Error).message || 'An unknown error occurred.',
              variant: 'destructive',
            });
          }
        } else {
          try {
            await add_recruiters(formData, uploadedUrl);
            setUrls(uploadedUrl);
          } catch (error) {
            await edgestore.myPublicImages.delete({ url: uploadedUrl });
            toast({
              description:
                (error as Error).message || 'An unknown error occurred.',
              variant: 'destructive',
            });
          }
        }
      } catch (error) {
        toast({
          description: 'Error while Uploading Image',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({ description: 'Please upload an image', variant: 'destructive' });
    }
  }

  async function handleClick() {
    setImgLoading(true);
    try {
      await edgestore.myPublicImages.delete({ url: imageUrl });
      setUrls('');
    } catch (error) {
      toast({
        description: 'Error while deleting image',
        variant: 'destructive',
      });
    } finally {
      setImgLoading(false);
    }
  }

  return (
    <div>
      {urls ? (
        <div className="relative w-[300px] h-[150px] rounded-md  hover:cursor-pointer mx-auto group bg-white">
          <button
            disabled={imgloading}
            onClick={handleClick}
            className="absolute z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
          >
            <Trash2 size={30} color="red" />
          </button>
          <Image
            src={urls}
            fill
            alt="alumni_image"
            className="object-contain transition px-3 duration-300 ease-in-out group-hover:brightness-50"
          />
        </div>
      ) : (
        <SingleImageDropzone
          className="object-contain mx-auto mt-10"
          width={300}
          check={false}
          height={150}
          value={file}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 3,
          }}
          onChange={(file) => {
            setFile(file);
          }}
        />
      )}
      <form
        onClick={(e) => {
          e.preventDefault();
          handleAction(new FormData(e.currentTarget));
        }}
        className="flex flex-col mt-8 gap-8 items-center"
      >
        <div className="flex flex-col w-1/2 gap-2">
          <Label htmlFor="name"> Name * </Label>
          <Input
            placeholder="Amazon"
            name="name"
            id="name"
            className="mx-auto"
            required
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNames(e.target.value);
            }}
          ></Input>
        </div>
        <Button className="w-1/2 mx-auto" type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Update'
          )}
        </Button>
      </form>
    </div>
  );
};

export default RecruitersForm;
