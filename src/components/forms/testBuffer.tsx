'use client'
import { isExplicit } from '@/functions/images/isExplicit'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '../ui/button'

export const schema = z.object({
	image: z.instanceof(File).refine((value) => value.size < 1024 * 1024 * 4, {
		message: 'Image size must be less than 4MB',
	}),
	description: z.string().min(20).max(70),
	author: z.string().length(32).startsWith('user_'),
	submit: z.undefined(),
})

export default function Formulario() {
	const { toast } = useToast()

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			author: '',
			description: '',
			image: undefined,
			submit: undefined,
		},
	})

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmit = async (data: z.infer<typeof schema>) => {
		const formData = schema.safeParse(data)
		if (!formData.success) {
			toast({ description: 'Invalid form data', variant: 'destructive' })
		}

		if (formData.success) {
			toast({ description: 'Form submitted' })
		}

		try {
			await isExplicit({
				author: data.author,
				description: data.description,
				image: data.image,
			})
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									placeholder="My image is a creepy castle with some pumpkins in the front..."
									type="text"
									{...field}
								></Input>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<FormField
					control={form.control}
					name="image"
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem>
							<FormLabel>Upload your image</FormLabel>
							<FormControl>
								<Input
									{...fieldProps}
									placeholder="Picture"
									type="file"
									accept="image/*, application/pdf"
									onChange={(event) =>
										onChange(
											(event.target.files ??
												event.target.files)
												? event.target.files[0]
												: null,
										)
									}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				></FormField>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
