'use client';

import React from 'react';
import { Spinner } from '@heroui/spinner';
import { Skeleton } from '@heroui/skeleton';
import { Card, CardBody } from '@heroui/card';
import { useTranslations } from 'next-intl';

// Table row skeleton loader
export function CharacterTableSkeleton() {
  return (
    <div className='space-y-3'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className='flex items-center space-x-4 p-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2 flex-1'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
          </div>
          <Skeleton className='h-6 w-16' />
          <Skeleton className='h-6 w-20' />
        </div>
      ))}
    </div>
  );
}

// Search loading indicator
export function SearchLoadingIndicator({
  isSearching,
}: {
  isSearching: boolean;
}) {
  const t = useTranslations('characters');

  if (!isSearching) return null;

  return (
    <div className='flex items-center gap-2 text-default-500 text-sm p-2'>
      <Spinner color='primary' size='sm' />
      <span>{t('searching')}</span>
    </div>
  );
}

// Pagination loading state
export function PaginationLoadingState() {
  const t = useTranslations('characters');

  return (
    <div className='flex justify-center items-center gap-2 py-4'>
      <Spinner color='primary' size='sm' />
      <span className='text-default-500 text-sm'>{t('loadingMore')}</span>
    </div>
  );
}

// Full page loading state
export function FullPageLoadingState() {
  const t = useTranslations('characters');

  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] space-y-6'>
      <div className='relative'>
        <Spinner color='primary' size='lg' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='h-8 w-8 rounded-full bg-primary/20 animate-pulse' />
        </div>
      </div>

      <div className='text-center space-y-2'>
        <h3 className='text-lg font-semibold bg-gradient-to-r from-portal-green via-rick-yellow to-rick-red bg-clip-text text-transparent'>
          {t('loadingTitle')}
        </h3>
        <p className='text-default-500 text-sm'>{t('loadingSubtitle')}</p>
      </div>
    </div>
  );
}

// Drawer loading state
export function DrawerLoadingState() {
  const t = useTranslations('characters');

  return (
    <div className='flex flex-col items-center justify-center py-12 space-y-4'>
      <Spinner color='primary' size='lg' />
      <div className='text-center space-y-1'>
        <p className='text-default-500 text-sm'>{t('loadingCharacter')}</p>
        <p className='text-default-400 text-xs'>
          {t('loadingCharacterSubtitle')}
        </p>
      </div>
    </div>
  );
}

// Error loading state
export function ErrorLoadingState({
  error,
  onRetry,
}: {
  error?: string;
  onRetry?: () => void;
}) {
  const t = useTranslations('characters');

  return (
    <Card className='max-w-md mx-auto'>
      <CardBody className='text-center space-y-4 p-6'>
        <div className='text-danger'>
          <Spinner color='danger' size='lg' />
        </div>
        <div className='space-y-2'>
          <h3 className='text-lg font-semibold text-danger'>
            {t('loadingError')}
          </h3>
          <p className='text-default-500 text-sm'>
            {error || t('loadingErrorDefault')}
          </p>
        </div>
        {onRetry && (
          <button
            className='text-primary text-sm hover:underline'
            onClick={onRetry}
          >
            {t('retry')}
          </button>
        )}
      </CardBody>
    </Card>
  );
}

// Skeleton for character cards
export function CharacterCardSkeleton() {
  return (
    <Card className='w-full'>
      <CardBody className='p-4'>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-16 w-16 rounded-full' />
          <div className='space-y-2 flex-1'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
            <div className='flex gap-2'>
              <Skeleton className='h-5 w-16' />
              <Skeleton className='h-5 w-20' />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// Loading state for filters
export function FilterLoadingState() {
  return (
    <div className='flex gap-3'>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className='h-10 w-32 rounded-lg' />
      ))}
    </div>
  );
}

// Inline loading indicator
export function InlineLoadingIndicator({ text }: { text?: string }) {
  const t = useTranslations('characters');

  return (
    <div className='flex items-center gap-2 text-default-500 text-sm'>
      <Spinner color='primary' size='sm' />
      <span>{text || t('loading')}</span>
    </div>
  );
}

// Loading overlay
export function LoadingOverlay({
  isVisible,
  text,
}: {
  isVisible: boolean;
  text?: string;
}) {
  const t = useTranslations('characters');

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center'>
      <Card className='max-w-sm w-full mx-4'>
        <CardBody className='text-center space-y-4 p-6'>
          <Spinner color='primary' size='lg' />
          <div className='space-y-1'>
            <h3 className='text-lg font-semibold'>{t('loading')}</h3>
            <p className='text-default-500 text-sm'>
              {text || t('loadingSubtitle')}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
