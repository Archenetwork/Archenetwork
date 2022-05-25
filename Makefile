install:
	rm -rf node_modules
	pnpm install

build-alpha:
	rm -rf dist
	pnpm build:alpha
