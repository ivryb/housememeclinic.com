<template>
  <Head>
    <Meta name="viewport" content="width=device-width, initial-scale=1" />

    <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <Link rel="manifest" href="/site.webmanifest" />
    <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <Meta name="msapplication-TileColor" content="#2b5797" />
    <Meta name="theme-color" content="#ffffff" />
  </Head>

  <div data-theme="forest" class="min-h-screen flex flex-col">
    <div class="container mx-auto pt-12 pb-24 flex-1">
      <NuxtPage />
    </div>
    <AppFooter />
  </div>
</template>
