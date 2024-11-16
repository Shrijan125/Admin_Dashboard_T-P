'use client';
import { useState } from 'react';
import AlumniInput from './AlumniInput';
import { Button } from '@/components/ui/button';
import { SingleImageDropzone } from './SingleImageDropZone';
import { useEdgeStore } from '@/lib/edgestore';
import { useToast } from '@/hooks/use-toast';
import add_alumni, { update_alumni } from '@/app/actions/alumni/alumni';
import Image from 'next/image';
import { Loader2, Trash2 } from 'lucide-react';

export default function AlumniForm({
  name,
  year,
  role,
  company,
  imageUrl,
  id,
}: {
  name: string;
  year: string;
  role: string;
  company: string;
  imageUrl: string;
  id?: string;
}) {
  const [formData, setFormData] = useState({
    academicyear: year,
    name: name,
    role: role,
    company: company,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [file, setFile] = useState<File>();
  const [urls, setUrls] = useState<string>(imageUrl);
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imgloading, setImgLoading] = useState(false);
  const handleAction = async (formdata: FormData) => {
    if (file || urls) {
      setLoading(true);
      try {
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
            await update_alumni({ formdata, id, urls: urls || uploadedUrl });
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
            await add_alumni(formdata, uploadedUrl);
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
  };

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
    }
    {
      setImgLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center m-6 gap-2">
        {urls ? (
          <div className="relative w-[200px] h-[200px] rounded-full hover:cursor-pointer group">
            <button
              disabled={imgloading}
              onClick={handleClick}
              className="absolute z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
            >
              <Trash2 color="red" size={30} />
            </button>
            <Image
              src={urls}
              fill
              alt="alumni_image"
              className="object-cover transition duration-300 ease-in-out group-hover:brightness-50"
            />
          </div>
        ) : (
          <SingleImageDropzone
            className="rounded-full object-contain"
            width={200}
            height={200}
            value={file}
            check={true}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 3,
            }}
            onChange={(file) => {
              setFile(file);
            }}
          />
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAction(new FormData(e.currentTarget));
        }}
        className="grid grid-cols-2 gap-x-8 mt-8 gap-y-14"
      >
        <AlumniInput
          label="Academic Year *"
          name="academicyear"
          placeholder="2019-20"
          value={formData.academicyear}
          onChange={handleChange}
        ></AlumniInput>
        <AlumniInput
          label="Name *"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
        ></AlumniInput>
        <AlumniInput
          label="Role *"
          name="role"
          placeholder="Software Engineer"
          value={formData.role}
          onChange={handleChange}
        ></AlumniInput>
        <AlumniInput
          label="Company *"
          name="company"
          placeholder="Google"
          value={formData.company}
          onChange={handleChange}
        ></AlumniInput>
        <Button
          className="col-span-2 w-1/4 mx-auto"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Update'
          )}
        </Button>
      </form>
      <div className="text-gray-200/50 text-center mt-20">
        Fields marked in * indicates required field.
      </div>
    </>
  );
}
