// @Author	: Luca Leon Happel
// @Date	: 14.11.2019
// @URL		: https://github.com/Quoteme/intersect

// point2point :: Num a => [a] -> [a] -> Boolean
export const point2point = (a,b) => a.length == b.length
	? a
		.map((x,i) => x==b[i])
		.every(x => x==true)
	: false;
	// TODO: add condition if one point has only 0s ater r the the other one is only r long

// point2interval :: Real a => a -> (a,a) -> Boolean
export const point2interval = (a,i) => i[0] <= a && a <= i[1];

// interval2interval :: Real a => (a,a) -> (a,a) -> Boolean
export const interval2interval = (i,j) => j[0] <= i[0] && i[1] <= j[1];

// also works on n dimensional objects
// the following provides information for a
// 3D Hyperplane (a cube) as parameter p
//	[
//		(min X, max X),
//		(min Y, max Y),
//		(min Z, max Z)
//	]
// point2plane :: Real a => (a,a) -> [(a,a)] -> Boolean
export const point2plane = (a,p) =>
	a.length == p.length
	? a
		.map((x,i) => point2interval(x,p[i]))
		.every(x => x==true)
	: undefined

// also works on n dimensional objects
// planes are defined as in the section point2plane
// plane2plane :: Real a => [(a,a)] -> [(a,a)] -> Boolean
export const plane2plane = (p,q) =>
	point2plane(
		p.map(x => x[0]),
		q
	) &&
	point2plane(
		p.map(x => x[1]),
		q
	)

// also works on n dimensional Spheres
// point2circle :: Num a => [a] -> Real -> [a] -> ([a] -> Real) -> Boolean
export const point2circle = (p,r,q=p.map(_=>0),d=Math.hypot) =>
	d(...p.map((x,i) => x-q[i])) <= r;

// determines if a circle intersects an interval
// interval2circle :: Num a => a -> Real -> [a,a] -> Boolean
export const interval2circle = (c,r,i,d=Math.hypot) =>
	point2circle([c], r+Math.abs(i[0]-i[1])/2, [(i[0]+i[1])/2], d)

// determines if a hypersphere intersects a Hyperplane
// plane2circle :: Num a => [(a,a)] -> Real -> [a] -> ([a] -> Real) -> Boolean
export const plane2circle = (p,r,c,d=Math.hypot) => p
	.map((i,j) => interval2circle(c[j],r,i,d) )
	.every(e => e==true)

// determines if a point is an element of a n-D array
// point2Array :: Int a => [a] -> [a]^n -> Boolean
export const point2Array = (a,arr) =>
	a.filter(x => !Number.isInteger(x)) == 0
	? new Array(a.length)
		.fill(0)
		.map((_,i) => [0,[arr].flat(i)[0].length-1])
		.map((e,i) => point2interval(a[i],e))
		.every(x => x==true)
	: undefined
