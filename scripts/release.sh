#!/bin/sh

# Check for a valid increment
if [[ ! " patch minor major " =~ " $1 " ]]; then
	echo 'You must provide a valid increment as a first argument: patch, minor or major.'
	exit 1
fi

# Check branch is master
if [ $(git symbolic-ref --short HEAD) != 'master' ]; then
	echo 'You must be on branch master to release a new version.'
	exit 1
fi

# Check branch is clean
if [ "$(git diff --shortstat)" != "" ]; then
	echo 'You have uncommitted changes.'
	exit 1
fi

# Check branch is up-to-date
git fetch

# Build the project
npm run build

# Increment the version
TAG=$(npm version $1 --git-tag-version false)
VERSION=${TAG:1}
DATE=$(date +%Y-%m-%d)
LINK=$(grep '\[Unreleased\]:' CHANGELOG.md)
ESCAPED_LINK=$(echo $LINK | sed -e 's/\[/\\[/g' -e 's/\]/\\]/g')
HEAD_LINK=$(echo $LINK | sed -E "s/v[0-9.]+$/$TAG/g" )
RELEASE_LINK=$(echo $LINK | sed -e s/Unreleased/$VERSION/g -e s/HEAD/$TAG/g)

# Update changelog
sed -i '' "s/## \[Unreleased\]/## [Unreleased]\\
\\
## [$VERSION] - $DATE/g" CHANGELOG.md
sed -i '' "s|$ESCAPED_LINK|$HEAD_LINK\\
$RELEASE_LINK|g" CHANGELOG.md

# Commit and tag the release
git commit -am "Bump to version $VERSION"
git tag "$TAG"
