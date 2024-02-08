"use client";
import { Button } from "@/components/ui/button";
import {
  CircleBackslashIcon,
  ImageIcon,
  TrashIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { uploadImageToCloudinary, validateImages } from "@/lib/cloudinary";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { publishProduct } from "./actions";
import { Product } from "@/database/types";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { currencyArray } from "@/lib/currency";
import { generateSlug } from "@/lib/slug";

const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  customFields: z.record(z.string()),
  stock: z.coerce.number(),
  currency: z.string(),
});

interface uploadedFile {
  loading: boolean;
  file_path: string | null;
  public_id?: string | null;
  sizeMb?: number | null; // Size in MB
}

export default function CreateProductPage() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<uploadedFile[]>([]);

  const handleImageUpload = async (image: File, index: number) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset as string);
    formData.append("api_key", apiKey as string);

    try {
      setUploadedFiles((prev) => [
        ...prev,
        {
          loading: true,
          file_path: null,
          sizeMb: Math.round((image.size / 1024 / 1024) * 100) / 100,
        },
      ]);

      // Send the image to Cloudinary and track upload progress
      const res = await uploadImageToCloudinary(formData);

      if (res.status === 200) {
        const data = await res.data;

        // Update the uploaded files array with the uploaded image
        setUploadedFiles((prev) =>
          prev.map((file, i) =>
            i === index
              ? {
                  loading: false,
                  file_path: data.secure_url,
                  public_id: data.public_id,
                  sizeMb: Math.round((image.size / 1024 / 1024) * 100) / 100,
                }
              : file
          )
        );

        console.log("Image uploaded:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const files = Array.from(event.target.files);

      const result = validateImages(files, uploadedFiles.length);
      if (!result.validated) {
        toast.error(result.message);
        return;
      }

      console.log(result);

      files.forEach((file, index) => {
        handleImageUpload(file, index + uploadedFiles.length);
      });
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const result = validateImages(acceptedFiles, uploadedFiles.length);
      if (!result.validated) {
        toast.error(result.message);
        return;
      }

      acceptedFiles.forEach((file, index) => {
        handleImageUpload(file, index + uploadedFiles.length);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeSelectedImage = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    toast.success("Image deleted");
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      customFields: {},
      stock: 0,
      currency: "eur",
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    const toastId = toast.loading("Publishing product...");
    const product: Product = {
      images: uploadedFiles,
      name: values.name,
      slug: generateSlug(values.name),
      price: values.price.toString(),
      currency: values.currency,
      id: uuidv4(),
      description: values.description,
      customFields: values.customFields,
      stock: values.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await publishProduct(product);

    if (!result.success) {
      toast.error("Failed to publish product");
      return;
    }

    toast.success("Product published successfully", {
      id: toastId,
      duration: 1000,
      onAutoClose: () => window.location.replace("/products"),
    });
  }

  return (
    <div className="space-y-12 max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between py-5 border-b">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">New Product</h2>
          <p className="mt-1 text-muted-foreground">
            Add a new product to your inventory.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/products/">
              Cancel <CircleBackslashIcon className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter a well descriptive name for your product.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-full">
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <div className="items-center divide-x gap-3 justify-center w-full border rounded-lg p-3 grid grid-cols-2">
                        <div
                          className="relative cursor-pointer w-full h-full py-12 border-2 border-dashed rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-primary-foreground hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-primary-foreground/70"
                          {...getRootProps()}
                        >
                          <label
                            htmlFor="dropzone-file"
                            className="cursor-pointer flex items-center justify-center w-full h-full"
                          >
                            <div className="text-center">
                              <div className="border p-2 rounded-md max-w-min mx-auto">
                                <UploadIcon className="w-4 h-4" />
                              </div>

                              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Drag your images here
                                </span>
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-400">
                                Or click to select files (Max 5MB)
                              </p>
                            </div>
                          </label>
                        </div>

                        <input
                          {...getInputProps()}
                          onChange={handleImageChange}
                        />

                        <div className="h-full pl-3">
                          {uploadedFiles.map((file, index) => {
                            if (file.loading) {
                              return (
                                <div
                                  className="flex space-x-2 items-center justify-between hover:bg-muted/30 rounded p-2 cursor-default"
                                  key={index}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className="w-12 h-12 rounded bg-muted overflow-hidden flex items-center justify-center">
                                      <div className="dark:hidden">
                                        <HashLoader
                                          color="#6B7280"
                                          loading={true}
                                          size={30}
                                        />
                                      </div>

                                      <div className="hidden dark:flex">
                                        <HashLoader
                                          color="#D1D5DB"
                                          loading={true}
                                          speedMultiplier={1.5}
                                          size={30}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex flex-col justify-center gap-1">
                                      <Skeleton className="w-32 h-6 rounded-sm" />
                                      <Skeleton className="w-16 h-4 rounded-sm" />
                                    </div>
                                  </div>

                                  <Skeleton className="w-8 h-8 rounded" />
                                </div>
                              );
                            }

                            if (file.file_path) {
                              return (
                                <div
                                  key={index}
                                  className="flex space-x-2 items-center justify-between hover:bg-muted/30 rounded p-2 cursor-default"
                                >
                                  <div className="flex items-center space-x-2">
                                    <Link
                                      href={file.file_path}
                                      target="_blank"
                                      rel="noreferrer noopener"
                                      className="w-12 h-12 rounded bg-muted relative overflow-hidden cursor-zoom-in"
                                    >
                                      <Image
                                        src={file.file_path}
                                        alt="Product Image"
                                        layout="fill"
                                        objectFit="cover"
                                      />
                                    </Link>
                                    <div className="flex flex-col justify-center">
                                      <p className="font-medium text-secondary-foreground text-sm">
                                        Product Image {index + 1}
                                      </p>
                                      <small className="text-xs text-muted-foreground leading-tight">
                                        {file.sizeMb} MB
                                      </small>
                                    </div>
                                  </div>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeSelectedImage(index)}
                                  >
                                    <TrashIcon className="w-4 h-4" />
                                  </Button>
                                </div>
                              );
                            }
                          })}

                          {uploadedFiles.length == 0 && (
                            <div className="flex w-full gap-2 h-full justify-center items-center flex-col">
                              <div className="p-3 bg-primary-foreground rounded-full border">
                                <ImageIcon className="w-5 h-5" />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                No images uploaded
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </FormItem>
                  </div>

                  <div className="sm:col-span-3">
                    <div className="grid grid-cols-4 gap-2">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel>Price per unit</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Price of a single unit of the product.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="opacity-0">
                              Currency
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Currency" />
                              </SelectTrigger>
                              <SelectContent>
                                {currencyArray.map((currency, index) => (
                                  <SelectItem key={index} value={currency.code}>
                                    {currency.code.toUpperCase()}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            How many units of the product are available.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-full">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="About the product..."
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Write a few sentences about the product.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button asChild variant="outline">
                <Link href="/products">
                  Cancel <CircleBackslashIcon className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button type="submit">
                Publish <UploadIcon className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
