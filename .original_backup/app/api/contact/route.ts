import { NextResponse } from 'next/server';
import { ServiceInquirySchema } from '@/app/types/services';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body using our Zod schema
    const validatedData = ServiceInquirySchema.parse(body);

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email
    // 3. Log the inquiry
    console.log('New contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      serviceCategory: validatedData.serviceCategory,
      timestamp: new Date().toISOString(),
    });

    // For now, we'll simulate a slight delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
        data: {
          inquiryId: `INQ-${Date.now()}`,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other types of errors
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}