#!/usr/bin/env bash

cd $(dirname "$0")

if [ -d 'build' ]; then
	rm -rf 'build'
fi

# TODO: minify scripts
